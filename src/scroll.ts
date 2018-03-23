export {
    Scroll,
};

class Scroll {
    public scrollToStart() {
        const value = -window.scrollY;
        window.scrollBy(0, value);
    }
    public dist(value: number) {
        window.scrollBy(0, value);
    }
}
