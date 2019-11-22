import pytesseract
import cv2

class OCR:
  def getText(img,lang):
    # enlarge image
    scale_percent = 100
    w = int(img.shape[1] * scale_percent / 100)
    h = int(img.shape[0] * scale_percent / 100)
    img = cv2.resize(img,(w,h))

    # add white border to image
    img = cv2.copyMakeBorder(img,100,100,100,100,cv2.BORDER_CONSTANT,(255,255,255))
    return pytesseract.image_to_string(img,lang=lang)