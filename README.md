# TravelDay

## Установка и запуск:
	```bash
	npm i 
	npm run dev - for devmode
	npm run build - for build
	```

## Prettier:

## Расширения для работы с Prettier

### VS Code

1. Установите расширение [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).
2. Включите автоматическое форматирование при сохранении:
    - Откройте настройки VS Code.
    - Найдите `Editor: Format On Save` и включите.

### WebStorm

1. Перейдите в `Preferences > Plugins` и установите Prettier.
2. Настройте путь к Prettier в `Preferences > Languages & Frameworks > JavaScript > Prettier`.

## Использование Prettier

1. Форматирование всех файлов:
    ```bash
    npx prettier --write .
    or
    npm run format
    ```
2. Проверка файлов без изменений:
    ```bash
    npx prettier --check .
    or
    npm run format
    ```
