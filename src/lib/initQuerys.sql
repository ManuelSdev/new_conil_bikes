/*CREATE TABLE IF NOT EXISTS*/
/**/
DROP TABLE IF EXISTS Range,
Type,
Segment,
Pedal,
CompatiblePedal,
Size,
Model,
Bike,
Customer,
Booking,
BookingOrder;

DROP TYPE IF EXISTS bikeSize,
bikeType,
bikeRange,
bikeState,
bookingState;

CREATE TYPE bikeSize AS ENUM ('s', 'm', 'l', 'xl', 'xxl');

CREATE TYPE bikeType AS ENUM ('mountain', 'city', 'electric', 'road');

CREATE TYPE bikeRange AS ENUM ('ride-trekking', 'midRange', 'highEnd', 'premium');

CREATE TYPE bikeState AS ENUM ('s1', 's2', 's3');

CREATE TYPE bookingState AS ENUM ('pending', 'active', 'finished', 'cancelled');

CREATE TABLE
  Type (type bikeType NOT NULL, PRIMARY KEY (type));

INSERT INTO
  Type
VALUES
  ('mountain'),
  ('city'),
  ('electric'),
  ('road');

CREATE TABLE
  Range (range bikeRange NOT NULL, PRIMARY KEY (range));

INSERT INTO
  Range
VALUES
  ('premium'),
  ('highEnd'),
  ('midRange'),
  ('ride-trekking');

CREATE TABLE
  Segment (
    type bikeType NOT NULL,
    range bikeRange NOT NULL,
    price smallint NOT NULL CHECK (price > 0),
    basket boolean NOT NULL,
    FOREIGN KEY (type) REFERENCES Type,
    FOREIGN KEY (range) REFERENCES Range,
    PRIMARY KEY (type, range)
  );

INSERT INTO
  Segment
VALUES
  ('city', 'midRange', 12, true),
  ('city', 'highEnd', 15, true),
  ('mountain', 'midRange', 12, true),
  ('mountain', 'highEnd', 15, true),
  ('mountain', 'premium', 25, true),
  ('road', 'midRange', 15, false),
  ('road', 'highEnd', 18, false),
  ('road', 'premium', 25, false),
  ('electric', 'ride-trekking', 25, true);

CREATE TABLE
  Pedal (
    pedalModel text NOT NULL,
    pedalType text NOT NULL,
    price smallint NOT NULL CHECK (price >= 0),
    quantity smallint NOT NULL CHECK (quantity >= 0),
    PRIMARY KEY (pedalModel)
  );

INSERT INTO
  Pedal
VALUES
  ('pedalModel-A', 'pedalType-1', 0, 10),
  ('pedalModel-B', 'pedalType-1', 0, 8),
  ('pedalModel-C', 'pedalType-1', 0, 12),
  ('pedalModel-D', 'pedalType-1', 0, 12),
  ('pedalModel-E', 'pedalType-2', 0, 12),
  ('pedalModel-F', 'pedalType-2', 0, 12);

CREATE TABLE
  CompatiblePedal (
    type bikeType NOT NULL,
    range bikeRange NOT NULL,
    pedalModel text NOT NULL,
    FOREIGN KEY (type, range) REFERENCES Segment (type, range),
    FOREIGN KEY (pedalModel) REFERENCES Pedal,
    PRIMARY KEY (type, range, pedalModel)
  );

INSERT INTO
  CompatiblePedal
VALUES
  ('mountain', 'highEnd', 'pedalModel-E'),
  ('mountain', 'highEnd', 'pedalModel-F'),
  ('mountain', 'premium', 'pedalModel-E'),
  ('mountain', 'premium', 'pedalModel-F'),
  ('road', 'highEnd', 'pedalModel-A'),
  ('road', 'highEnd', 'pedalModel-B'),
  ('road', 'highEnd', 'pedalModel-C'),
  ('road', 'highEnd', 'pedalModel-D'),
  ('road', 'premium', 'pedalModel-A'),
  ('road', 'premium', 'pedalModel-B'),
  ('road', 'premium', 'pedalModel-C'),
  ('road', 'premium', 'pedalModel-D');

CREATE TABLE
  Size (
    size bikeSize NOT NULL,
    heightRange smallint ARRAY,
    PRIMARY KEY (size)
  );

INSERT INTO
  Size
VALUES
  ('s', '{150, 160}'),
  ('m', '{161, 170}'),
  ('l', '{171, 180}'),
  ('xl', '{181, 190}'),
  ('xxl', '{191, 200}');

CREATE TABLE
  Model (
    model text NOT NULL,
    type bikeType NOT NULL,
    range bikeRange NOT NULL,
    brand text NOT NULL,
    description text NOT NULL,
    images text ARRAY NOT NULL,
    FOREIGN KEY (type, range) REFERENCES Segment,
    PRIMARY KEY (model)
  );

CREATE TABLE
  Bike (
    sn text NOT NULL,
    model text NOT NULL,
    size bikeSize NOT NULL,
    state text NOT NULL,
    FOREIGN KEY (model) REFERENCES Model,
    FOREIGN KEY (size) REFERENCES Size,
    PRIMARY KEY (sn)
  );

CREATE TABLE
  Customer (
    email text NOT NULL,
    name text NOT NULL,
    surname text NOT NULL,
    phone text NOT NULL,
    userId serial,
    PRIMARY KEY (email)
  );

CREATE TABLE
  Booking (
    bookingId serial,
    email text NOT NULL,
    price smallint NOT NULL CHECK (price > 0),
    startDate date NOT NULL,
    endDate date NOT NULL,
    bookingDate timestamp,
    duration text,
    deliveryAddress text,
    pickupAddress text,
    FOREIGN KEY (email) REFERENCES Customer,
    PRIMARY KEY (bookingId)
  );

CREATE TABLE
  BookingOrder (
    bikeSn text NOT NULL,
    bookingId int REFERENCES Booking,
    pedalModel text REFERENCES Pedal,
    addBaskey boolean NOT NULL,
    FOREIGN KEY (bikeSn) REFERENCES Bike (sn),
    FOREIGN KEY (pedalModel) REFERENCES Pedal,
    FOREIGN KEY (bookingId) REFERENCES Booking,
    PRIMARY KEY (bikeSn, bookingId)
  );