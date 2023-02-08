//APP CONST
export const START = "start";
export const END = "end";
export const HOME = "home";
export const STORE = "store";
export const DONE = "done";

export const PENDING = "pending";
export const ACTIVE = "active";
export const FINISHED = "finished";
export const CANCELLED = "cancelled";

//APP LISTS
export const sizesList = [
    ["s", [150, 160]],
    ["m", [161, 170]],
    ["l", [171, 180]],
    ["xl", [181, 190]],
    ["xxl", [191, 200]],
];

export const typesList = [
    ["mountain", "montaña"],
    ["city", "paseo"],
    ["electric", "eléctrica"],
    ["road", "carretera"],
];

export const rangesList = [
    ["premium", "premium"],
    ["highEnd", "alta"],
    ["midRange", "media"],
];

//APP MAPS
export const BIKE_SIZES_MAP = {
    s: [150, 160],
    m: [161, 170],
    l: [171, 180],
    xl: [181, 190],
    xxl: [191, 200],
};
export const BIKE_TYPES_MAP = {
    mountain: "montaña",
    city: "paseo",
    electric: "eléctrica",
    road: "carretera",
};

export const BIKE_RANGES_MAP = {
    premium: "premium",
    highEnd: "alta",
    midRange: "media",
};

export const BOOKING_STATES_MAP = {
    pending: "pendiente",
    active: "activa",
    finished: "finalizada",
    cancelled: "cancelada",
};

export const BIKE_STATES_MAP = {
    inUse: "en uso",
    inRepair: "en reparación",
    avaiable: "disponible",
};

export const EVENTS_MAP = {
    start_booking: "Empiezan",
};

export const varNameToString = (variable) => Object.keys({ variable }[0]);


//APP COLORS
export const bookingDayColors = {
    startDay: '#60C5F1 ',
    endDay: '#C785C8',
    startEndDay: 'linear-gradient(90deg, #60C5F1 50%, #C785C8 50%)'
}

