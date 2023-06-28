const ru = {
  translation: {
    header: 'Перенос векторных слоёв',
    sourceForm: {
      header: 'Источник',
      sourceNGWURL: 'Адрес исходного сервера',
      sourceLayerId: 'ID векторного слоя',
      authHeader: 'Авторизация',
      username: 'Имя пользователя',
      password: 'Пароль',
      preview: 'Предпросмотр',
      error: {
        required: 'Обязательное поле',
        url: 'Должен быть валидным URL',
        layerId: 'Должно быть числом'
      }
    },
    targetForm: {
      header: 'Целевой сервер',
      targetNGWURL: 'Адрес целевого сервера',
      targetGroupId: 'ID целевой группы',
      authHeader: 'Авторизация',
      username: 'Имя пользователя',
      password: 'Пароль',
      linkToGroup: 'Перейти на страницу группы',
      error: {
        required: 'Обязательное поле',
        url: 'Должен быть валидным URL',
        groupId: 'Должно быть числом'
      }
    },
    submit: 'Выполнить',
    submitPending: 'Выполняется...',
    finishMessage: {
      networkError: 'Ошибка сети',
      wrongCred: 'Неверные логин или пароль',
      unauthorized: 'Требуется авторизация',
      sourceIsNotVector: 'Переносимый ресурс должен быть векторным слоем',
      targetIsNotGroup: 'Целевой ресурс должен быть группой',
      alreadyExists: 'Ресурс с таким именем уже существует',
      sourceResourceNotFound: 'Исходный слой не найден',
      targetResourceNotFound: 'Целевой ресурс не найден',
      other: 'Что-то пошло не так',
      success: 'Успех'
    }
  }
};

export default ru;
