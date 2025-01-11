import cv2
import torch

def yolo_phone_detection():
    model = torch.hub.load('./yolov5', 'yolov5s', source='local')
    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        print("Couldn't open webcam")
        return

    while True:
        ret, frame = cap.read()
        if not ret:
            print("Couldn't read the frame.")
            break

        img_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = model(img_rgb)

        for box in results.xyxy[0]:
            x1, y1, x2, y2, confidence, class_id = box[:6]
            label = model.names[int(class_id)]

            if confidence > 0.7 and label == "cell phone":
                cv2.rectangle(frame, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 2)
                label_text = f'{label} {confidence:.2f}'
                cv2.putText(frame, label_text, (int(x1), int(y1) - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

        cv2.imshow("Dear Player, Masked Workers are Watching You...", frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    yolo_phone_detection()
