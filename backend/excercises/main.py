def read_large_file(file_path):
    with open(file_path, 'r') as f:
        for line in f:
            yield line.strip()  # Возвращает строку без пробелов
            
# Использование
for line in read_large_file('large_file.txt'):
    print(line)  # Обрабатывает файл по одной строке, не загружая целиком.