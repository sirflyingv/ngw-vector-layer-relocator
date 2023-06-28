### Приложение для переноса векторного слоя с одного инстанса NextGIS Web на другой(тестовое задание на фронтенд разработчика).
![image](https://github.com/sirflyingv/resourse-relocator/assets/22076495/a25cc660-21d2-4c15-95f2-d03bc5dc4700)

## Описание:
Приложение состоит из серверной и клиентской части. 
- Серверная часть обеспечивает работу с удаленными серверами NextGIS Web, что сделано для обхода CORS.
  Использованы Express, morgan и модули NextGIS Frontend: NgwConnector и NgwUploader
- Фронтенд создан на React с использованием Formik, yup, axios, bootstrap модуля NextGIS Frontend - NgwMap для предварительного просмотра векторного слоя. Для обхода CORS GeoJSON слоя получается через серверную часть.

Интерфейс блокирует кнопки на время выполнения запросов, отображает спиннер, уведомляет пользователя об успехе или ошибке операции.

Приложение обрабатывает большую часть ошибок:
- ресурс не найден
- ресурс не является векторным слоем или группой
- ресурс с таким именем уже существует в указанной группе
- Потеря соединения
- Большую часть прочих ошибок как "Что-то пошло не так"

# Примечание: для удобства ознакомления с приложением поля по умолчанию заполнены валидными параметрами

## Установка и запуск:
```
npm run install-all
npm run build
npm start
```
Далее открыть localhost:3000 в браузере
