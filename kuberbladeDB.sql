        drop database if exists kubership;
        create database kubership;

        use kubership;

        create table if not exists owner (
            ownerid int primary key auto_increment,
            name varchar(64),
            contactperson varchar(64),
            contactemail varchar(64)
        );

        create table if not exists user (
            userid int primary key auto_increment,
            name varchar(64),
            email varchar(64),
            ownerid int,
            foreign key (ownerid) references owner(ownerid)
        );

        create table if not exists ships
        (
            shipnr int primary key auto_increment,
            name varchar(64),
            owner int,
            type ENUM('Passenger', 'Cargo'),
            image varchar(64),
            currentvalue varchar(64),
            year DATE
           # foreign key(owner) references owner(owner_id)
        );

        create table if not exists crewmember(
            crewmemberid int primary key auto_increment,
            shipnr int,
            name varchar(64),
            role varchar(64),
            foreign key (shipnr) references ships(shipnr),
            unique (crewmemberid, shipnr)
        );

        CREATE TABLE IF NOT EXISTS shipments
        (
            shipmentid int primary key auto_increment,
            shipnr int,
            starttime DATE,
            endtime DATE,
            departurelocation VARCHAR(64),
            destinationlocation VARCHAR(64),
            FOREIGN KEY (shipnr) REFERENCES ships(shipnr)
        );


        create table maintenance(
            maintenanceid int primary Key auto_increment,
            shipnr int,
            date DATE,
            type varchar(64),
            description text,
            foreign Key (shipnr) references ships(shipnr)
        );

        INSERT INTO owner (name, contactperson, contactemail)
        VALUES
        ('Red-Haired Shanks', 'Shanks', 'shanks@example.com'),
        ('Monkey D. Dragon', 'Dragon', 'dragon@example.com'),
        ('Donquixote Doflamingo', 'Doflamingo', 'doflamingo@example.com');

        INSERT INTO user (name, email, ownerid)
        VALUES
        ('Luffy', 'luffy@example.com', 1),
        ('Zoro', 'zoro@example.com', 1),
        ('Nami', 'nami@example.com', 1),
        ('Usopp', 'usopp@example.com', 1),
        ('Chopper', 'chopper@example.com', 2),
        ('Gol D. Roger', 'gol@example.com', 3),
        ('Brook', 'brook@example.com', 3);

        INSERT INTO ships (shipnr, name, owner, type, image, currentvalue, year)
        VALUES
        (899,'Thousand Sunny', 1, 'Passenger', 'sunny.jpg', '50', '2010-01-01'),
        (900,'Going Merry', 1, 'Passenger', 'merry.jpg', '20', '2000-05-15'),
        (901,'Oro Jackson', 2, 'Cargo', 'oro.jpg', '0','2000-05-15'),
        (902,'Thriller Bark', 3, 'Passenger', 'thriller.jpg', '2000','2000-05-15');

        INSERT INTO crewmember (shipnr, name, role)
        VALUES
        (899, 'Monkey D. Luffy', 'Captain'),
        (899, 'Roronoa Zoro', 'Swordsman'),
        (899, 'Nami', 'Navigator'),
        (899, 'Usopp', 'Sniper'),
        (899, 'Tony Tony Chopper', 'Doctor'),
        (901, 'Gol D. Roger', 'Captain'),
        (902, 'Brook', 'Musician');

        INSERT INTO shipments (shipnr, starttime, endtime, departurelocation, destinationlocation)
        VALUES
        (899, '2022-01-01', '2022-01-15', 'Fish-Man Island', 'Sabaody Archipelago'),
        (901, '2005-03-10', '2005-04-20', 'Water 7', 'Enies Lobby'),
        (902, '2015-06-01', '2015-07-15', 'Florian Triangle', 'Sabaody Archipelago');

        INSERT INTO maintenance (shipnr, date, type, description)
        VALUES
        (900, '2022-02-01', 'Engine Overhaul', 'Thousand Sunny underwent a major engine overhaul.'),
        (899, '2005-05-01', 'Hull Repair', 'Going Merry underwent extensive repairs at Water 7.'),
        (902, '2015-08-01', 'Routine Maintenance', 'Thriller Bark received routine maintenance and repairs.');