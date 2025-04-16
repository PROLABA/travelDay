type Point = { x: number; y: number };

export class ImageZoomPan {
    private img: HTMLElement;
    private container: HTMLElement;

    private scale = 1;
    private translate: Point = { x: 0, y: 0 };

    private isDragging = false;
    private lastPos: Point = { x: 0, y: 0 };

    private plusBtn: HTMLElement | null;
    private minusBtn: HTMLElement | null;

    constructor(container: HTMLElement) {
        this.container = container;
        this.img = container.querySelector('.select-image__img') as HTMLElement;
        this.plusBtn = container.querySelector('.plus');
        this.minusBtn = container.querySelector('.minus');

        this.initStyles();
        this.attachEvents();
    }

    private initStyles() {
        this.img.style.position = 'absolute';
        this.img.style.top = '0';
        this.img.style.left = '0';
        this.img.style.cursor = 'grab';
        this.img.style.transformOrigin = 'top left';
        this.updateTransform();
    }

    private attachEvents() {
        this.container.addEventListener('wheel', this.handleWheel, { passive: false });
        this.img.addEventListener('mousedown', this.handleMouseDown);
        document.addEventListener('mousemove', this.handleMouseMove);
        document.addEventListener('mouseup', this.handleMouseUp);

        this.plusBtn?.addEventListener('click', this.handleZoomIn);
        this.minusBtn?.addEventListener('click', this.handleZoomOut);
    }

    private handleWheel = (e: WheelEvent) => {
        e.preventDefault();
        const delta = -e.deltaY;
        this.applyZoom(delta, e.clientX, e.clientY);
    };

    private applyZoom(delta: number, clientX: number, clientY: number) {
        const zoomSpeed = 0.001;
        const oldScale = this.scale;

        this.scale += delta * zoomSpeed;
        this.scale = Math.max(0.1, Math.min(5, this.scale));

        const rect = this.container.getBoundingClientRect();
        const offsetX = clientX - rect.left;
        const offsetY = clientY - rect.top;

        const dx = (offsetX - this.translate.x) / oldScale;
        const dy = (offsetY - this.translate.y) / oldScale;

        this.translate.x -= dx * (this.scale - oldScale);
        this.translate.y -= dy * (this.scale - oldScale);

        this.updateTransform();
    }

    private handleZoomIn = () => {
        const rect = this.container.getBoundingClientRect();
        this.applyZoom(100, rect.width / 2, rect.height / 2);
    };

    private handleZoomOut = () => {
        const rect = this.container.getBoundingClientRect();
        this.applyZoom(-100, rect.width / 2, rect.height / 2);
    };

    private handleMouseDown = (e: MouseEvent) => {
        this.isDragging = true;
        this.lastPos = { x: e.clientX, y: e.clientY };
        this.img.style.cursor = 'grabbing';
    };

    private handleMouseMove = (e: MouseEvent) => {
        if (!this.isDragging) return;

        const dx = e.clientX - this.lastPos.x;
        const dy = e.clientY - this.lastPos.y;

        this.translate.x += dx;
        this.translate.y += dy;

        this.lastPos = { x: e.clientX, y: e.clientY };
        this.updateTransform();
    };

    private handleMouseUp = () => {
        this.isDragging = false;
        this.img.style.cursor = 'grab';
    };

    private updateTransform() {
        this.img.style.transform = `translate(${this.translate.x}px, ${this.translate.y}px) scale(${this.scale})`;
    }

    public destroy() {
        this.container.removeEventListener('wheel', this.handleWheel);
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseup', this.handleMouseUp);
        this.img.removeEventListener('mousedown', this.handleMouseDown);
        this.plusBtn?.removeEventListener('click', this.handleZoomIn);
        this.minusBtn?.removeEventListener('click', this.handleZoomOut);
    }
}
