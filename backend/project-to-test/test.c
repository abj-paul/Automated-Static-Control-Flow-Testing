void main() {
    int x = 10;
    int y = 0;
    if (x > 0) {
        y = x - 1;
        while (x > 5) {
            y = x - 2;
            x--;
        }
    } else {
        x = y + 1;
    }
    anotherFunction();
    return 0;
}

void anotherFunction() {
    int y = 5;
    for (int i = 0; i < y; i++) {
        y += i;
    }
    uwuFunction();
}

void uwuFunction() {
    int y = 5;
    for (int i = 0; i < y; i++) {
        y += i;
    }
}