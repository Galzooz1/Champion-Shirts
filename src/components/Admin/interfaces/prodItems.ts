export interface IProdItems {
    _id:           string;
    sale:          Sale;
    quantity_sold: number;
    name:          string;
    info:          string;
    image:         string;
    price:         number;
    canvasDrawing: CanvasDrawing[];
    category_s_id: number;
    colors:        Color[];
    date_created:  string;
    user_id:       string;
    s_id:          number;
}

export interface CanvasDrawing {
    _id:              string;
    direction:        string;
    url:              string;
    sizeOfCanvas:     SizeOfCanvas;
    positionOfCanvas: PositionOfCanvas;
}

export interface PositionOfCanvas {
    x: number;
    y: number;
}

export interface SizeOfCanvas {
    width:  number;
    height: number;
}

export interface Color {
    amount_of_size: AmountOfSize;
    _id:            string;
    color:          string;
}

export interface AmountOfSize {
    XS:   number;
    S:    number;
    M:    number;
    L:    number;
    XL:   number;
    XXL:  number;
    XXXL: number;
}

export interface Sale {
    onSale:      boolean;
    amount:      number;
    timeInHours: number;
}
