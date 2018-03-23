export {
    Scroll,
};

class Scroll {
    public dist(value: number) {
        window.scrollBy(0, value);
    }
}
