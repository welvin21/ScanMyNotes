import numpy as np
import argparse
import cv2
import time
from PIL import Image, ImageDraw, ImageFont
from imutils.object_detection import non_max_suppression
from ocr import OCR

# construct argument for this script accessible from the command line
argParser = argparse.ArgumentParser()
argParser.add_argument('-i', '--image', type=str, help='path to image')
argParser.add_argument('-east', '--east', type=str,
                       help='path tp east detector (.pb file)')
argParser.add_argument('-c', '--min-confidence', type=float,
                       default=0.5, help='min probability to inspect a region')
argParser.add_argument('-w', '--width', type=int, default=1600,
                       help='resized image width (multiple of 32)')
argParser.add_argument('-e', '--height', type=int, default=3200,
                       help='resized image height (multiple of 32)')

args = vars(argParser.parse_args())

# load input image
image = cv2.imread(args['image'])
orig = image.copy()
h, w = image.shape[:2]
rH = h/float(args['height'])
rW = w/float(args['width'])

# initialize blank PIL Image for output
output = Image.new('RGB', (w,h), (255,255,255))
draw = ImageDraw.Draw(output)

# change image's dimensions
h, w = args['height'], args['width']
image = cv2.resize(image, (w,h))

# define layers' name for later purpose
layers = [
    'feature_fusion/Conv_7/Sigmoid',
    'feature_fusion/concat_3'
]

# load pre-trained east text detector model
print('[INFO] Loading EAST text detector model...')
net = cv2.dnn.readNet(args['east'])

# construct a blob from image input
blob = cv2.dnn.blobFromImage(image, 1.0, (w, h),
                             (123.68, 116.78, 103.94), swapRB=True, crop=False)

# forward image to model and get output stored
start = time.time()
net.setInput(blob)
scores, geometry = net.forward(layers)
print('[INFO] text detection took {:.2f} seconds.'.format(time.time()-start))

# find scores dimension
numOfRows, numOfCols = scores.shape[2:4]
rects, confidences = [], []

# analyse scores and geometry
# loop over rows
for i in range(numOfRows):
    scoresData = scores[0, 0, i]
    xData0 = geometry[0, 0, i]
    xData1 = geometry[0, 1, i]
    xData2 = geometry[0, 2, i]
    xData3 = geometry[0, 3, i]
    anglesData = geometry[0, 4, i]

    # traverse each columns
    for j in range(numOfCols):
        if(scoresData[j] < args['min_confidence']):
            continue

        offsetX, offsetY = j*4.0, i*4.0
        cos = np.cos(anglesData[j])
        sin = np.sin(anglesData[j])
        height = xData0[j] + xData2[j]
        width = xData1[j] + xData3[j]

        endX = int(offsetX + (cos * xData1[j]) + (sin * xData2[j]))
        endY = int(offsetY - (sin * xData1[j]) + (cos * xData2[j]))
        startX = int(endX - width)
        startY = int(endY - height)

        rects.append((startX, startY, endX, endY))
        confidences.append(scoresData[j])

# apply non-maxima suppression to suppress weak, overlapping bounding
# boxes
rects = non_max_suppression(np.array(rects), probs=confidences)

# draw each bounding boxes

for box in rects:
    startX = int(box[0] * rW)
    startY = int(box[1] * rH)
    endX = int(box[2] * rW)
    endY = int(box[3] * rH)

    boxHeight = abs(endY - startY)
    boxWidth = abs(endX - startX)
    toleranceX = int(10/100 * boxWidth)
    toleranceY = int(10/100 * boxHeight)

    startX-=toleranceX
    startY-=toleranceY
    endX+=toleranceX
    endY+=toleranceY

    # draw the bounding box on the image
    # cv2.rectangle(orig, (startX, startY), (endX, endY), (0, 255, 0), 2)

    # get portion of image containing text
    crop = orig[startY:endY, startX:endX]
    
    # image pre-processing
    crop = OCR.preProcess(crop)

    # get text from ocr
    txt = (OCR.getText(crop,'eng'))
    print(txt)

    font = ImageFont.truetype('./fonts/arial.ttf', max(int(boxHeight * 0.6), 14))
    draw.text((startX,startY), txt, (0, 0, 0), font=font)

# output image
# cv2.imshow('image',orig)
# cv2.waitKey(0)
output.show()


