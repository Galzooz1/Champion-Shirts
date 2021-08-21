export interface IProdItems {
    sale:          Sale;
    quantity_sold: number;
    _id:           string;
    name:          string;
    info:          string;
    price:         number;
    image:         string;
    category_s_id: number;
    isClean:       boolean;
    properties:    Property[];
    date_created:  string;
    user_id:       string;
    s_id:          number;
    catName:       string;
}

export interface Property {
    amount:                Amount;
    _id:                   string;
    color:                 string;
    frontImg:              string;
    sizeOfCanvasFront:     SizeOfCanvas;
    positionOfCanvasFront: PositionOfCanvas;
    backImg:               string;
    sizeOfCanvasBack:      SizeOfCanvas;
    positionOfCanvasBack:  PositionOfCanvas;
}

export interface Amount {
    XS:   number;
    S:    number;
    M:    number;
    L:    number;
    XL:   number;
    XXL:  number;
    XXXL: number;
}

export interface PositionOfCanvas {
    x: number;
    y: number;
}

export interface SizeOfCanvas {
    width:  number;
    height: number;
}

export interface Sale {
    onSale:      boolean;
    amount:      number;
    timeInHours: number;
}