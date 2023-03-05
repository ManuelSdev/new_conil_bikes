//https://stackoverflow.com/questions/58384179/syntaxerror-cannot-use-import-statement-outside-a-module
//import conn from './src/lib/db'

const { Pool } = require('pg')
const { models } = require('./fake/initBikes')

//console.log(bikes[1])
const pool = new Pool({
   /*
      user: process.env.PGSQL_USER,
      password: process.env.PGSQL_PASSWORD,
      host: process.env.PGSQL_HOST,
      port: process.env.PGSQL_PORT,
      database: process.env.PGSQL_DATABASE,
*/
   host: '34.170.15.84',
   port: '5432',
   user: 'postgres',
   database: 'postgres',
   password: 'laki99',
})

const insertModelText = () => {
   let texto = ''

   models.forEach((model, index) => {
      texto =
         texto +
         `
         ('${model.model}','${model.type}','${model.range}','${model.brand}','${
            model.description
         }','${model.image}' )${index + 1 !== models.length ? ',' : ''}`
   })
   let all = `
   INSERT INTO
   BikeModel (bikeModelName, bikeModelType, bikeModelRange, bikeModelBrand, bikeModelDescription, bikeModelImages)
   VALUES  ${texto};  
   `
   // console.log(all)
   return all

   //console.log(all)
}

const insertBikeText = () => {
   const sizes = ['s', 'm', 'l', 'xl', 'xxl']
   let bikeSn = 1000
   let texto = ''
   sizes.forEach((size, sizeIndex) => {
      let n = 0
      while (n <= 3) {
         models.forEach((model, index) => {
            texto =
               texto +
               `
           ('${bikeSn}','${model.model}','${size}','avaiable' )${
                  index + 1 === models.length && sizeIndex === 4 && n === 3
                     ? ''
                     : ','
               }`
            bikeSn++
         })
         n++
      }
   })

   let all = `
   INSERT INTO
     Bike (bikeSn, bikeModelName, bikeSize,bikeState)
   VALUES  ${texto};  
   `
   // console.log(all)
   return all
}
const execute = async (query) => {
   console.log('VEEE', process.env.PGSQL_HOST)
   try {
      await pool.connect() // gets connection
      await pool.query(query) // sends queries

      await pool.query(insertModelText())
      await pool.query(insertBikeText())
      return true
   } catch (error) {
      console.error('ERROR------ ', error.stack)
      return false
   } finally {
      await pool.end() // closes connection
   }
}
const text = `
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
  'hight',
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
  VALUES ('mid'), ('hight'), ('top'), ('ride');

CREATE TABLE Segment (
  bikeModelType modelType NOT NULL,
  bikeModelRange modelRange NOT NULL,
  segmentPrice smallint NOT NULL CHECK (segmentPrice > 0),
  FOREIGN KEY (bikeModelType) REFERENCES BikeModelType,
  FOREIGN KEY (bikeModelRange) REFERENCES BikeModelRange,
  PRIMARY KEY (bikeModelType, bikeModelRange)
);

INSERT INTO Segment
  VALUES ('city', 'mid', 12), ('city', 'hight', 15), ('mountain', 'mid', 12), ('mountain', 'hight', 15), ('mountain', 'top', 25), ('road', 'mid', 15), ('road', 'hight', 18), ('road', 'top', 25), ('electric', 'ride', 25);

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
  VALUES ('mountain', 'hight', 'pedalModel-E'), ('mountain', 'hight', 'pedalModel-F'), ('mountain', 'top', 'pedalModel-E'), ('mountain', 'top', 'pedalModel-F'), ('road', 'hight', 'pedalModel-A'), ('road', 'hight', 'pedalModel-B'), ('road', 'hight', 'pedalModel-C'), ('road', 'hight', 'pedalModel-D'), ('road', 'top', 'pedalModel-A'), ('road', 'top', 'pedalModel-B'), ('road', 'top', 'pedalModel-C'), ('road', 'top', 'pedalModel-D');

CREATE TABLE BikeSize (
  bikeSize bikeSizeType NOT NULL,
  sizeDescription smallint ARRAY,
  PRIMARY KEY (bikeSize)
);

INSERT INTO BikeSize
  VALUES ('s', '{150, 160}'), ('m', '{161, 170}'), ('l', '{171, 180}'), ('xl', '{181, 190}'), ('xxl', '{191, 200}');

CREATE TABLE BikeModel (
  bikeModelName text NOT NULL,
  bikeModelType modelType NOT NULL,
  bikeModelRange modelRange NOT NULL,
  bikeModelBrand text NOT NULL,
  bikeModelDescription text NOT NULL,
  bikeModelImages text ARRAY NOT NULL,
  FOREIGN KEY (bikeModelType, bikeModelRange) REFERENCES Segment,
  PRIMARY KEY (bikeModelName)
);

CREATE TABLE Bike (
  bikesn text NOT NULL,
  bikeModelName text NOT NULL,
  bikeSize bikeSizeType NOT NULL,
  bikeState text NOT NULL,
  FOREIGN KEY (bikeModelName) REFERENCES BikeModel,
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

`
execute(text).then((result) => {
   if (result) {
      console.log('Table created')
   }
})
