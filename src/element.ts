export { ScrollElement };

class ScrollElement {
  constructor(element?: HTMLElement | null) {
    const body = document.body;
    const html = document.documentElement;

    if (!element) {
      this.size = (horizontal: boolean) => horizontal
        ? document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth
        : document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight

      this.scrollSize = (horizontal: boolean) => horizontal
        ? Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth)
        : Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight)

      this.position = (horizontal: boolean) => horizontal
        ? window.pageXOffset
        : window.pageYOffset

      this.offset = () => 0

      this.scrollTo = (x: number, y: number) => { window.scroll(x, y) }
    } else {
      this.size = (horizontal: boolean) => horizontal
        ? element.clientWidth
        : element.clientHeight

      this.scrollSize = (horizontal: boolean) => horizontal
        ? element.scrollWidth
        : element.scrollHeight

      this.position = (horizontal: boolean) => horizontal
        ? element.scrollLeft
        : element.scrollTop

      this.offset = (horizontal: boolean) => horizontal
        ? element.getBoundingClientRect().left
        : element.getBoundingClientRect().top

      this.scrollTo = (x: number, y: number) => {
        element.scrollTop = x;
        element.scrollLeft = y;
      }
    }
  }
  public size: (horizontal: boolean) => number;
  public scrollSize: (horizontal: boolean) => number;
  public position: (horizontal: boolean) => number;
  public offset: (horizontal: boolean) => number;
  public scrollTo: (x: number, y: number) => void;
}
