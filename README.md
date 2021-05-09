# Ceasar cipher CLI toll

Данное приложение создано в рамках курса basic-nodejs-2021Q2 от rolling scopes school. Представляет оно из себя консольный шифр Цезаря. Шифр применяется только к латинским буквам с сохранением регистра

# Параметры
Приложение было создано на базе node v.14.16.1

На вход принимает следующие параметры:

1. -s, --shift: сдвиг, объязательный
2. -i, --input: путь к входному файлу
3. -o, --output: путь к выходному файлу
4. -a, --action: тип операции encode/decode, объязательный

- Если не указан путь к входном файлу будет использован proccess.stdin
- Если нет доступа к указанному входному файлу програма завершится с ошибкой
- Если не указан путь к выходному файлу будет использован proccess.stdout
- Если нет доступа к указанному выходному файлу програма завершится с ошибкой
- Сдвиг может быть отрицательным
- тип операции может быть только encode или decode

Для запуска приложение достаточно запустить нодой файл index.js передав необходимые параметры

Примеры запуска

```sh
$ node index -a encode -s 7 -i "./input.txt" -o "./output.txt"
```

```sh
$ node index --action encode --shift 7 --input plain.txt --output encoded.txt
```

```sh
$ node index --action decode --shift 7 --input encoded.txt --output plain.txt
```

```sh
$ node index --action encode --shift -1 --input plain.txt --output encoded.txt
```
