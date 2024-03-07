drop database if exists kuberblade;
create database kuberblade;

use kuberblade;

create table if not exists ships
(
    ship_id int primary key auto_increment,
    name varchar(64),
    type ENUM('Passenger', 'Cargo'),
    person_capacity int,
    container_capacity int,
    current_location varchar(64),
    current_value varchar(64),
    useful_life float,
    year DATE
);

create table if not exists crew_member(
    crew_member_id int primary key auto_increment,
    ship_id int,
    name varchar(64),
    role varchar(64),
    foreign key (ship_id) references ships(ship_id)
);

create table if not exists route(
    route_id int primary key auto_increment,
    ship_id int,
    start_time DATE,
    end_time DATE,
    departure_location varchar(64),
    destination_location varchar(64),
    foreign key (ship_id) references ships(ship_id)
);

create table maintenance(
    maintenance_id int primary Key auto_increment,
    ship_id int,
    date DATE,
    type varchar(64),
    description text,
    foreign Key (ship_id) references ships(ship_id)
);

INSERT INTO ships (name, type, person_capacity, container_capacity, current_location, current_value, useful_life, year)
VALUES
('Thousand Sunny', 'Passenger', 500, 2000, 'Fish-Man Island', '200.000', 50, '2010-01-01'),
('Going Merry', 'Passenger', 50, NULL, 'Water 7', '200.000', 20,'2000-05-15'),
('Oro Jackson', 'Cargo', NULL, 10000, 'Unicorn', '1.000.000', 50,'2000-05-15'),
('Thriller Bark', 'Passenger', 2000, NULL, 'Florian Triangle', '20.000.000.000', 200, '2000-05-15');

INSERT INTO crew_member (ship_id, name, role)
VALUES
(1, 'Monkey D. Luffy', 'Captain'),
(1, 'Roronoa Zoro', 'Swordsman'),
(1, 'Nami', 'Navigator'),
(1, 'Usopp', 'Sniper'),
(2, 'Tony Tony Chopper', 'Doctor'),
(3, 'Gol D. Roger', 'Captain'),
(4, 'Brook', 'Musician');

INSERT INTO route (ship_id, start_time, end_time, departure_location, destination_location)
VALUES
(1, '2022-01-01', '2022-01-15', 'Fish-Man Island', 'Sabaody Archipelago'),
(2, '2005-03-10', '2005-04-20', 'Water 7', 'Enies Lobby'),
(3, '2015-06-01', '2015-07-15', 'Florian Triangle', 'Sabaody Archipelago');

INSERT INTO maintenance (ship_id, date, type, description)
VALUES
(1, '2022-02-01', 'Engine Overhaul', 'Thousand Sunny underwent a major engine overhaul.'),
(2, '2005-05-01', 'Hull Repair', 'Going Merry underwent extensive repairs at Water 7.'),
(3, '2015-08-01', 'Routine Maintenance', 'Thriller Bark received routine maintenance and repairs.');
