import pytesseract
import cv2

class OCR:
  def preProcess(img):
    img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    h,w = img.shape[:2]
    for i in range(h):
      for j in range(w):
        if(img[i,j] <= 160):
          img[i,j] = 0
        else:
          img[i,j] = 255
    
    img = cv2.copyMakeBorder(img,10,10,10,10,cv2.BORDER_CONSTANT,value=(255,0,0))
    return img
  def getText(img,lang):
    txt = pytesseract.image_to_string(img,lang=lang)
    # if(txt == ''):
    #   cv2.imshow('image',img)
    #   cv2.waitKey(0)
    return txt
