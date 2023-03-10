/*CREATE TABLE IF NOT EXISTS*/
/**/
DROP TABLE IF EXISTS bikeModelRange, bikeModelType, Segment, PedalModel, CompatiblePedal, BikeSize, BikeModel, Bike, Customer, Booking, BookingOrder;

DROP TYPE IF EXISTS bikeSizeType, modelType, modelRange, bikeState, bookingState;

CREATE TYPE bikeSizeType AS ENUM (
  's',
  'm',
  'l',
  'xl',
  'xxl'
);

CREATE TYPE modelType AS ENUM (
  'mountain',
  'city',
  'electric',
  'road'
);

CREATE TYPE modelRange AS ENUM (
  'ride',
  'mid',
  'high',
  'top'
);

CREATE TYPE bikeState AS ENUM (
  's1',
  's2',
  's3'
);

CREATE TYPE bookingState AS ENUM (
  'pending',
  'active',
  'finished',
  'cancelled'
);

CREATE TABLE BikeModelType (
  bikeModelType modelType NOT NULL,
  PRIMARY KEY (bikeModelType)
);

INSERT INTO BikeModelType
  VALUES ('mountain'), ('city'), ('electric'), ('road');

CREATE TABLE BikeModelRange (
  bikeModelRange modelRange NOT NULL,
  PRIMARY KEY (bikeModelRange)
);

INSERT INTO BikeModelRange
  VALUES ('mid'), ('high'), ('top'), ('ride');

CREATE TABLE Segment (
  bikeModelType modelType NOT NULL,
  bikeModelRange modelRange NOT NULL,
  segmentPrice smallint NOT NULL CHECK (segmentPrice > 0),
  FOREIGN KEY (bikeModelType) REFERENCES BikeModelType,
  FOREIGN KEY (bikeModelRange) REFERENCES BikeModelRange,
  PRIMARY KEY (bikeModelType, bikeModelRange)
);

INSERT INTO Segment
  VALUES ('city', 'mid', 12), ('city', 'high', 15), ('mountain', 'mid', 12), ('mountain', 'high', 15), ('mountain', 'top', 25), ('road', 'mid', 15), ('road', 'high', 18), ('road', 'top', 25), ('electric', 'ride', 25);

CREATE TABLE PedalModel (
  pedalModelName text NOT NULL,
  pedalModelType text NOT NULL,
  pedalModelPrice smallint NOT NULL CHECK (pedalModelPrice >= 0),
  quantity smallint NOT NULL CHECK (quantity >= 0),
  PRIMARY KEY (pedalModelName)
);

INSERT INTO PedalModel
  VALUES ('pedalModel-A', 'pedalType-1', 0, 10), ('pedalModel-B', 'pedalType-1', 0, 8), ('pedalModel-C', 'pedalType-1', 0, 12), ('pedalModel-D', 'pedalType-1', 0, 12), ('pedalModel-E', 'pedalType-2', 0, 12), ('pedalModel-F', 'pedalType-2', 0, 12);

CREATE TABLE CompatiblePedal (
  bikeModelType modelType NOT NULL,
  bikeModelRange modelRange NOT NULL,
  pedalModelName text NOT NULL,
  FOREIGN KEY (bikeModelType, bikeModelRange) REFERENCES Segment (bikeModelType, bikeModelRange),
  FOREIGN KEY (pedalModelName) REFERENCES PedalModel,
  PRIMARY KEY (bikeModelType, bikeModelRange, pedalModelName)
);

INSERT INTO CompatiblePedal
  VALUES ('mountain', 'high', 'pedalModel-E'), ('mountain', 'high', 'pedalModel-F'), ('mountain', 'top', 'pedalModel-E'), ('mountain', 'top', 'pedalModel-F'), ('road', 'high', 'pedalModel-A'), ('road', 'high', 'pedalModel-B'), ('road', 'high', 'pedalModel-C'), ('road', 'high', 'pedalModel-D'), ('road', 'top', 'pedalModel-A'), ('road', 'top', 'pedalModel-B'), ('road', 'top', 'pedalModel-C'), ('road', 'top', 'pedalModel-D');

CREATE TABLE BikeSize (
  bikeSize bikeSizeType NOT NULL,
  minHeight smallint NOT NULL CHECK (minHeight > 0),
  maxHeight smallint NOT NULL CHECK (maxHeight > 0),
  PRIMARY KEY (bikeSize)
);

INSERT INTO BikeSize
  VALUES ('s', 150, 160), ('m', 161, 170), ('l', 171, 180), ('xl', 181, 190), ('xxl', 191, 200);

CREATE TABLE BikeModel (
  modelId integer GENERATED BY DEFAULT AS IDENTITY,
  bikeModelName text NOT NULL,
  bikeModelType modelType NOT NULL,
  bikeModelRange modelRange NOT NULL,
  bikeModelBrand text NOT NULL,
  bikeModelDescription text NOT NULL,
  bikeModelImages text ARRAY NOT NULL,
  FOREIGN KEY (bikeModelType, bikeModelRange) REFERENCES Segment,
  PRIMARY KEY (modelId)
);

CREATE TABLE Bike (
  bikesn text NOT NULL,
  modelId integer NOT NULL,
  bikeSize bikeSizeType NOT NULL,
  bikeState text NOT NULL,
  FOREIGN KEY (modelId) REFERENCES BikeModel,
  FOREIGN KEY (bikeSize) REFERENCES BikeSize,
  PRIMARY KEY (bikeSn)
);

CREATE TABLE Customer (
  customerEmail text NOT NULL,
  customerName text NOT NULL,
  customerSurname text NOT NULL,
  customerPhone text NOT NULL,
  customerId serial,
  PRIMARY KEY (customerEmail)
);

CREATE TABLE Booking (
  bookingId serial,
  customerEmail text NOT NULL,
  bookingPrice smallint NOT NULL CHECK (bookingPrice > 0),
  bookingDateTest date NOT NULL,
  bookingDate timestamp NOT NULL,
  bookingDateRange tstzrange NOT NULL,
  bookingDuration text,
  deliveryAddress text,
  pickupAddress text,
  FOREIGN KEY (customerEmail) REFERENCES Customer,
  PRIMARY KEY (bookingId)
);

CREATE TABLE BookingOrder (
  bikeSn text NOT NULL,
  bookingId int,
  pedalModelName text,
  hasBasket boolean NOT NULL,
  FOREIGN KEY (bikeSn) REFERENCES Bike (bikeSn),
  FOREIGN KEY (pedalModelName) REFERENCES PedalModel,
  FOREIGN KEY (bookingId) REFERENCES Booking,
  PRIMARY KEY (bikeSn, bookingId)
);


/**API**/
/** avaiable-size**/
/*
SELECT
 id
FROM
 Booking
WHERE
 '[2011-01-01 14:30:00,2011-01-09 15:30:00]'::tsrange && date
 */
WITH AvaiableBikes AS (
  SELECT
    bikeSn,
    bikeSize,
    bikeModelName
  FROM
    Bike
  WHERE
    bikeSn IN (
      SELECT
        bikeSn avaiableBikeSn
      FROM
        bike
      WHERE
        bikeSn NOT IN (
          SELECT
            bikeSn reservedBikeSn
          FROM
            BookingOrder
          WHERE
            bookingId IN (
              SELECT
                /*Devuelve tabla con una columna bookingId con
                 alias reservedId que contiene con los ids que
                 cumplen el WHERE*/
                bookingId reservedId
              FROM
                Booking
              WHERE
                /*DONDE el rango dado se superpone en algún día
                 con algunos de los rangos que contiene la columna
                 tzdate de la tabla Booking*/
                '[${dateRange}]'::tstzrange && bookingDateRange)))
        ORDER BY
          bikesize ASC);

SELECT DISTINCT
  bikeSize,
  bikeModelRange,
  bikeModelType
FROM
  AvaiableBikes
  INNER JOIN BikeModel ON AvaiableBikes.bikeModelName = BikeModel.bikeModelName
ORDER BY
  bikeSize ASC;


/***********/
WITH AvaiableBikes AS (
  SELECT DISTINCT
    bikeSize,
    bikeModelName
  FROM
    Bike
  WHERE
    bikeSn IN (
      SELECT
        bikeSn avaiableBikeSn
      FROM
        bike
      WHERE
        bikeSn NOT IN (
          SELECT
            bikeSn reservedBikeSn
          FROM
            BookingOrder
          WHERE
            bookingId IN (
              SELECT
                /*Devuelve tabla con una columna bookingId con
                 alias reservedId que contiene con los ids que
                 cumplen el WHERE*/
                bookingId reservedId
              FROM
                Booking
              WHERE
                /*DONDE el rango dado se superpone en algún día
                 con algunos de los rangos que contiene la columna
                 tzdate de la tabla Booking*/
                '[${dateRange}]'::tstzrange && bookingDateRange)))
          AND bikeModelType = '${size}'
        ORDER BY
          bikesize ASC;

)
SELECT DISTINCT
  bikeSize,
  bikeModelRange,
  bikeModelType
FROM
  AvaiableBikes
  INNER JOIN BikeModel ON AvaiableBikes.bikeModelName = BikeModel.bikeModelName
ORDER BY
  bikeSize ASC;


/**/
SELECT
  bikesize,
  heightrange
FROM
  bikesize;


/**/
WITH AvaiableBikes AS (
  SELECT DISTINCT
    bikeSize
  FROM
    Bike
  WHERE
    bikeSn IN (
      SELECT
        bikeSn avaiableBikeSn
      FROM
        bike
      WHERE
        bikeSn NOT IN (
          SELECT
            bikeSn reservedBikeSn
          FROM
            BookingOrder
          WHERE
            bookingId IN (
              SELECT
                bookingId reservedId
              FROM
                Booking
              WHERE
                /*DONDE el rango dado se superpone en algún día
                 con algunos de los rangos que contiene la columna
                 tzdate de la tabla Booking*/
                '[${dateRange}]'::tstzrange && bookingDateRange)))
        ORDER BY
          bikesize ASC
)
    SELECT DISTINCT
      AvaiableBikes.bikeSize,
      minHeight,
      maxHeight
    FROM
      AvaiableBikes
      INNER JOIN BikeSize ON AvaiableBikes.bikeSize = BikeSize.bikeSize