declare module "zombie" {
    class Zombie {
        constructor({ site: string });
        visit(url: string, cb);
        assert;
        window: Window;
    }
    export = Zombie;
}
