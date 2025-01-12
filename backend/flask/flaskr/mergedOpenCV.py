import cv2
import torch
import os
import time
import sys
import requests

def yolo_detection():
    yolov5_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../yolov5'))
    print("YOLOv5 Path:", yolov5_path)

    try:
        model = torch.hub.load(yolov5_path, 'yolov5s', source='local')
    except Exception as e:
        print(f"Error: {e}")
        return

    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        print("Couldn't open.")
        return
    else:
        print("Webcam opened successfully.")

    mode = "cell phone"
    print("Press 'p' for Person Detection, 'c' for Cell Phone Detection")

    hold_person_message_until = 0
    hold_phone_message_until = 0

    lives = 3

    phone_last_detected = False
    buffer=0
    
    while True:
        ret, frame = cap.read()
        if not ret:
            break

        img_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        try:
            results = model(img_rgb)
        except Exception as e:
            break

        person_count = 0
        phone_detected = False

        for box in results.xyxy[0]:
            x1, y1, x2, y2, confidence, class_id = box[:6]
            label = model.names[int(class_id)]

            if confidence > 0.7 and label == mode:
                if mode == "person":
                    person_count += 1
                    cv2.rectangle(frame, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 2)
                    label_text = f'{label} {confidence:.2f}'
                    cv2.putText(frame, label_text, (int(x1), int(y1) - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
                elif mode == "cell phone":
                    if buffer==0:
                        buffer=15
                    cv2.rectangle(frame, (int(x1), int(y1)), (int(x2), int(y2)), (255, 0, 0), 2)
                    label_text = f'{label} {confidence:.2f}'
                    cv2.putText(frame, label_text, (int(x1), int(y1) - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 0), 2)

        if buffer>0:
            buffer-=1

        if buffer==14:
            phone_last_detected = True
            lives -= 1
            if (lives == 2):
                requests.post("http://127.0.0.1:5051/play-song")
            elif (lives == 1):
                requests.post("http://127.0.0.1:5051/get-people")
                text = "Press c and get 4 people on screen!"

                # cv2.putText(image, text, (50, 250), cv2.FONT_HERSHEY_SIMPLEX, 3, (0, 0, 255), 3)
            elif (lives == 0):
                requests.post("http://127.0.0.1:5051/send-email")
                # height, width = 500, 1000
                # image = cv2.imread(cv2.samples.EMPTY_IMAGE)
                # cv2.putText(image, "GAME OVER", (50, 250), cv2.FONT_HERSHEY_SIMPLEX, 5, (0, 0, 255), 3)

        if mode == "person" and person_count == 4:
            hold_person_message_until = time.time() + 2

        if mode == "cell phone" and phone_detected:
            hold_phone_message_until = time.time() + 2

        height, width, _ = frame.shape

        if mode == "person" and time.time() < hold_person_message_until:
            text = "4 People Detected!"
            text_size = cv2.getTextSize(text, cv2.FONT_HERSHEY_SIMPLEX, 1, 3)[0]
            text_x = (width - text_size[0]) // 2
            text_y = height // 2
            cv2.putText(frame, text, (text_x, text_y), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 3)


        if mode == "cell phone" and time.time() < hold_phone_message_until:
            text = "Phone Detected!"
            text_size = cv2.getTextSize(text, cv2.FONT_HERSHEY_SIMPLEX, 1, 3)[0]
            text_x = (width - text_size[0]) // 2
            text_y = height // 2
            cv2.putText(frame, text, (text_x, text_y), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 3)
            
        cv2.putText(frame, f"Mode: {mode.capitalize()}", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 0), 2)

        cv2.imshow("YOLOv5 Real-Time Detection", frame)

        key = cv2.waitKey(1) & 0xFF
        if key == ord('p'):
            mode = "person"
            print("Switched to Person Detection.")
        elif key == ord('c'):
            mode = "cell phone"
            print("Switched to Cell Phone Detection.")

    cap.release()
    cv2.destroyAllWindows()
    print("Released webcam and closed windows.")

if __name__ == "__main__":
    yolo_detection()
