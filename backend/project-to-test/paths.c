int main() {
    int x = 10;
    int y = 5;

    if (x > 5) {
        y = 10;
    } else if (x < 5) {
        y = 20;
    } else {
        y = 30;
    }

    while (x > 0) {
        x--;
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