import pytesseract
import cv2

class OCR:
  def preProcess(img):
    # image interpolation using bicubic method
    img = cv2.resize(img,None, fx=1, fy=1, interpolation=cv2.INTER_CUBIC)

    # convert image to graycale format
    img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # pixel value binarization ( 0 or 255 )
    h,w = img.shape[:2]
    for i in range(h):
      for j in range(w):
        if(img[i,j] <= 160):
          img[i,j] = 0
        else:
          img[i,j] = 255

    #add white border
    img = cv2.copyMakeBorder(img,10,10,10,10,cv2.BORDER_CONSTANT,value=(255,255,255))
    return img
  def getText(img):
    config = ('-l eng --oem 1 --psm 8')
    txt = pytesseract.image_to_string(img,config=config)
    # if(txt == ''):
    #   cv2.imshow('image',img)
    #   cv2.waitKey(0)
    return txt
