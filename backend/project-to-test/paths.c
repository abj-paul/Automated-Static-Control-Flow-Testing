int main() {
    int x = 10;
    int y = 5;

    if (x > 5) {
        // Independent Path 1
        y = 10;
    } else if (x < 5) {
        // Independent Path 2
        y = 20;
    } else {
        // Independent Path 3
        y = 30;
    }

    while (x > 0) {
        // Independent Path 4
        x--;
    }

    return 0;
}