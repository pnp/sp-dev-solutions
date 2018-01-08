import { columnTypes, ILinkFieldValue, ILookupFieldValue, IPersonFieldValue } from './State';

export const getRandomInteger = (minValue:number, maxValue:number): number => {
	minValue = Math.ceil(minValue);
	maxValue = Math.floor(maxValue);
	return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
};

export const getRandomDate = (start:Date, end:Date): Date => {
	let randomDate:Date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
	return randomDate;
};

const nouns: Array<string> = [
	'Dog','Cat','Mouse','Moose','Squirrel','Chair','Table','Computer','Apple','Pizza','Kitchen','Rabbit','Tractor','Statue',
	'Old Lady','Skeleton','Flag','Pile of Rocks','Pork','Potato','Candle','Rope','Wrench','Tub','Lard','Toe','Burrito','King',
	'Butter','Cheese','Tooth','Foot','Tuxedo','Car','Plane','Hamster','Lizard','Brother','Sister','Pumpkin','Sweater','Newt',
	'Wizard','Building','Mall','Canyon','Treasure','Telescope','Island','Zombies','Grandma','Grandpa','Email','Puppies','Bug',
	'Phone','Construction Set','Bag of Billy Goats','Turtle','Diaper','Tree','Candy','Pillow','Alien','Baby','Cookie','Cup',
	'Book','Blouse','Pants','Socks','Troll','Fan','Dice','Cards','Box','Package','Sheep','Clown','Snot','Nose','Ear','Belly',
	'Widget','Gadget','Thing','Ice','Snow','Water','Leg','Hammer','Whale','Kangaroo','Dolphin','Elephant','Ornament','Reindeer',
	'Watch','Coin','Canada','Hat','Sombrero','Pony','Horse','Lips','Wheel','Gear','Knife','Refridgerator','Oven','Movie','Song',
	'Yeti','Polar Bear','Heart','Waffle','Steak','Slide','Shoe','Roller Blades','Cucumber','Popsicle','Toad','Tiger','Monkey',
	'Badger','Gremlin','Mummy','Vampire','Finger Tip','Bed','Sofa','Couch','Tent','Sleeping Bag','Iron','Bowl of Soup','Flute',
	'Trumpet','Piano','Hair','Plug','Notebook','Pencil','Pen','Sewing Machine','Tape','Toolbox','Cone','Watermelon','Sea Creature',
	'Vase','Donkey','Scarf','Monster','Printer','Dog Food','Food','Scar','Bandage','Truck','Motorcycle','Coffee Cup','Fog','Frog',
	'Pirate','Snake','Battleship','Scab','Buddy','Peanut','Jelly','Bean','Human','Robot','Planet','Spaceship','Boat','Goat',
	'Survivor','Samurai','Plant','President','Lima Beans','Seahorse','Egg','Adventure','Cactus','Pizza','Blanket','Lamp','Chicken'
];

const adjectives: Array<string> = [
	'Old','Blue','Red','Orange','Smelly','Squishy','Pretty','Tiny','Small','Huge','Ugly','Brown','Soft','Memorable','Dead','Sad','Cool',
	'Proud','Angry','Foamy','Weird','Nasty','Shiny','Sparkly','Glittery','Pink','Purple','Massive','Unreliable','Ancient','Hot','Bumpy',
	'Crunchy','Salty','Delicious','Smart','Funny','Hillarious','Generous','Kind','Evil','Yellow','Stinky','Fragrant','Golden','Sour',
	'Illegal','Flammable','Wet','Dirty','Crazy','Slimy','New','Ridiculous','Silly','Dumb','Great','Spooky','Scary','Calm','Hidden',
	'Misunderstood','Serious','Tall','Short','Spicy','Clammy','Furry','Wide','Melted','Slick','Cold','Damp','Musky','Saucy','Fuzzy',
	'Jelly Filled','Cheesy','Scrumptious','Undead','Moldy','Sweet','Sweaty','Chocolate Covered','Wise','Unwise','Troublesome','Freaky',
	'Unhinged','Maroon','Turquoise','Lovely','Friendly','Nice','Pirate','Green','Jealous','Hungry','Good Looking','Tasty','Questionable',
	'Hard Boiled','Apathetic','Sassy','Clever','Frustrated','Terrific','Awesome','Holy','Lumpy','Horrific','Scrawny','Vengeful','Round'
];

const firstNames: Array<string> = [
	'Fred','Betty','Louis','Chris','Noah','Eleanor','Geneva','Charlie','Jordan','Vince','Steve','Vesa','Marilyn','Abraham','John',
	'Martin','Nelson','Bill','Billy','Charles','Muhammad','Mahatma','Margaret','Maggie','Chelsie','Amy','Sarah','Matilda','Joan',
	'Peter','Pete','Donny','Vinnie','Christopher','George','Elvis','Albert','Paul','Elizabeth','Liz','Beth','Mikhail','Jawaharlal',
	'Leonardo','Raphael','Leo','Pablo','Frank','Thomas','Tom','Tommy','Ludwig','Oprah','Indira','Eva','Benazir','Desmond','Walter',
	'Neil','Barack','Malcom','Richard','Rick','Casey','Pat','Patrick','Russ','Russel','Mike','Michael','Georgie','Vladimir','Ingrid',
	'Amelia','Mary','Marty','Monty','Eric','William','Will','Gloria','Glenda','Alan','Mary Ellen','Sabrina','Keri','Kyle','Robert',
	'Bob','Bobbie','Rob','Steven','Stephen','Ronald','Ronnie','Ron','Christie','Crystal','Lionel','Roger','Sigmund','Katherine',
	'Katie','Kate','Jenny','Jennifer','David','Dave','Davey','Usain','Mao','Woodrow','Woody','Carl','Jack','Jackie','Anne','Simon',
	'Florence','Frances','Francis','Emile','Cristiano','Marie','Tim','Timmy','Timo','Timothy','Jon','Sara','Abe','Johnny','Rupert',
	'Jim','James','Jimmy','Kylie','Malala','Liam','Mason','Benjamin','Ben','Jacob','Elijah','Ethan','Emma','Emily','Olivia','Ava',
	'Sophia','Isabella','Mia','Charlotte','Abigail','Abby','Harper','Henry','Dorothy','Teddy','Theodore','Finn','Owen','Caleb','Elliot',
	'Grayson','Aria','Violet','Norah','Hazel','Aurora','Isla','Scarlett','Audrey','Luna','Alex','Alexander','Sebastian','Silas',
	'Jasper','Gabriel','Lucas','Jackson','Grace','Adelaide','Penelope','Vivienne','Evangeline','Eloise','Ivy','Lily','Landon','Aiden',
	'Archer','Felix','Wyatt','Milo','Atticus','Luke','Ezra','Lincoln','Arthur','Cora','Lydia','Mark','Lucy','Clara','Freya','Naomi',
	'Nate','Daniel','Dan','Dayne','Tyson','Bruce','Wayne','Clark','Lindsay','Mindy','Sawyer','Ruby','Maeve','Kaia','Chloe','Autumn',
	'August','Miles','Quinn','Rowan','Logan','Rose','Simon','Willow','Lucia','Milagros','Santiago','Lautaro','Franco','Joshua','Josh',
	'Ella','Sienna','Cooper','Riley','Lachlan','Lukas','Tobias','Maximilian','Lena','Leonie','Hannah','Lina','Yasmine','Aya','Adam',
	'Rayan','Nathan','Anas','Hugo','Manon','Lotte','Stan','Camille','Lucie','Lousie','Matheus','Thiago','Larissa','Beatriz','Madison',
	'Owen','Diego','Martina','Antonia','Isidora','Jose','Petra','Jan','Filip','Philip','Kirsten','Susanne','Inge','Jens','Lars',
	'Henrik','Soren','Hans','Jorgen','Niels','Alfie','Mikael','Amanda','Johannes','Juhani','Oskari','Aleksi','Enzo','Jade','Kilian',
	'Bence','Laura','Conor','Sean','Ryan','Bryan','Brian','Kate','Lewis','Sam','Samuel','Holly','Lillie','Francesco','Matteo','Luca',
	'Giulia','Francesca','Andrea','Mantas','Goda','Karina','Katrina','Dragan','Igor','Elena','Suzana','Elisa','Julian','Nicholas',
	'Nick','Nicole','Isaac','Miguel','Diego','Luis','Eduardo','Camila','Maria Fernanda','Daniela','Mariana','Maria Guadalupe','Ray',
	'Angel','Ruben','Jesse','Lisa','Fleur','Dylan','Jonas','Magnus','Emil','Emilie','Thea','Piotr','Barbara','Pawel','Ivan','Dmitry',
	'Alexei','Polina','Mariya','Viktoria','Yelizaveta','Stefan','Denisa','Georgiana','Seo-yeon','Min-jun','Ji-hun','Javier','Sergio',
	'Marta','Claudia','Anastasia','Olexandr','Natalia','Zhang Wei','Wang Fang','Li Wei','Li Xiu Ying','Li Na','Zhang Min','Wang Li',
	'Li Qiang','Li Jun','Zhang Yong','Li Yan','Li Yong','Wang Ping','Liu Fang','Li Li','Aiko','Chikako','Atsuko','Daisuke','Fumiko',
	'Haruko','Hideyoshi','Ichiro','Itsuki','Kazuhito','Kasumi','Mitsu','Shinobu','Tomoko','Yoshi','Wataru','Ado','Kyla','Harry','Anthony',
	'Tony','Brandon','Cameron','Christian','Briana','Alyssa','Alexis','Aliyah','Aaliyah','Destiny','Diamond','Hailey','Imani','Jasmine',
	'Josiah','Justin','Isaiah','Jayden','Jada','Kayla','Kennedy','Kevin','Tyler','Xavier','Zion','Trinity','Sydney','Makayla','Madison',
	'Laila','Kiara','Malik','Terrell','Toby','Terrance','Andre','Tyrone','Derek','Wes','Wesley','Lamar','Alonzo','Omar','Youssef',
	'Ahmed','Hussein','Abdallah','Manuel','Junior','Mehdi','Fatima','Fatma','Suha','Precious','Irene','Juan','Carlos','Cesar','Agustin',
	'Alysha','Alice','Mariana','Widelene','Lovelie','Esther','Angeline','Angilee','Luciana','Patricia','Linda','Abril','Hamza','Wei',
	'Reza','Noam','Amit','Nor','Ashley','Janine','Nadia','Marc','Ian','Tobias','Ali','Noel','Dmitrios','Georgios','Ellen','Ivaana'
];

const lastNames: Array<string> = [
	'Smith','Jones','Brown','Johnson','Williams','Miller','Gump','Taylor','Wilson','Davis','White','Clark','Hall','Thompson','Moore',
	'Anderson','Walker','Hill','Wood','Robinson','Lewis','Jackson','Tryniski','Green','Evans','King','Baker','Harris','Campbell','Lee',
	'Stewart','Turner','Parker','Cook','Edwards','Kent','Ward','Watson','Morgan','Davies','Cooper','Phillips','Gray','Hughes','Harrison',
	'Carter','Hamilton','Shaw','Bennett','Reed','Murphey','Hawn','McGown','Gove','Jimison','Healy','Willman','Shepherd','Fisher','Cox',
	'Washington','Palmer','Church','Stone','Marshall','Chapman','Holmes','Fox','Cole','Hart','Wells','Sullivan','Johnston','West',
	'Kennedy','Wallace','Porter','Webster','Long','Grant','Webb','Richards','Day','Ford','Barnes','Brooks','Gibson','Lincoln','Lane',
	'Black','Gardner','Street','Gordon','Lawrence','Rice','Jenkins','Armstrong','Knight','Burns','Dunn','Reid','Barker','Montgomery',
	'Roosevelt','Weaver','Lamb','Owens','Sutton','Kerr','Stanley','Watts','Fleming','Buchanan','Saunders','Peters','Connor','Mann',
	'Barton','Barber','Simmons','Harper','Stephens','Atkinson','Fowler','Howe','Bates','Snyder','Hawkins','Newman','Barrett','Sharp',
	'Hudson','Matthews','Coleman','Stevenson','Parsons','Warner','Pratt','Berry','Sherman','Morton','Williamson','Baldwin','Bishop',
	'French','Pearson','Payne','Potter','Hopkins','Dixon','Tucker','Fellows','Freeman','Myers','Park','Ferguson','Davidson','Peterson',
	'Morrison','Carpenter','Fuller','Fletcher','Crawford','Patterson','Rose','Hayes','Musayev','Hasanov','Huseynov','Mammadov','Ahmed',
	'Dewan','Gazi','Hasan','Rohoman','Wong','Wang','Zhou','Sun','Guo','Bairamov','Shengelia','Kumar','Ram','Sharma','Patel','Singh',
	'Mandal','Khatun','Cohen','Levi','Peretz','Friedman','Katz','Amar','Suzuki','Tanaka','Sato','Nakamura','Yoshida','Matsumoto','Ito',
	'Kobayashi','Watanabe','Takahashi','Hasegawa','Fujii','Kim','Jeong','Han','Cho','Kang','Shrestha','Tan','dela Cruz','Bautista',
	'Cortez','Rosales','Kaya','Demir','Arslan','Dogan','Nguyen','Pham','Phan','Duong','Gruber','Wagner','Steiner','Moser','Winkler',
	'Muller','Hofer','Peeters','Janssens','Jacobs','Dupont','De Smet','Horvat','Kovacevic','Novak','Nielsen','Anderson','Andersen',
	'Tamm','Ivanov','Vassiljev','Petrov','Pavlov','Kuznetsov','Korhonen','Virtanen','Laine','Lehtonen','Koskinen','Juvonen','Lindholm',
	'Martin','Bernard','Dubois','Petit','Durand','Schmidt','Schneider','Fischer','Schulz','Becker','Hoffmann','Horvath','Szabo',
	'Murphey','Walsh','Sullivan','Kelly','Doyle','McCarthy','Quinn','Rossi','Russo','Ferrari','Esposito','Romano','De Luca','Mancini',
	'Fontana','Lombardi','Greco','Kastrati','Jansons','Butkus','Borg','Farrugia','Davidov','Ivanovski','Petrovski','Janev','De Vries',
	'Van den Berg','De Boer','Dekker','Ven der Meer','Olsen','Larsen','Dahl','Pedersen','Nowak','Kowalski','Wozniak','Silva','Santos',
	'Cruz','Dumitru','Smirnov','Kozlov','Garcia','Fernandez','Rodriquez','Diaz','Ruiz','Perez','Giovanni','Kovalchuk','Bondar','Taylor',
	'Hall','MacDonald','Ross','Driscoll','Price','Gonzalez','Lopez','Alvarez','Romero','Torres','Ramirez','Hernandez','Flores','Gomez',
	'Tremblay','Gagnon','Sanchez','King','Collins','Bell','Kelly'
];

const domainSuffixes: Array<string> = [
	'com','org','net','gov','edu'
];

interface IPictureColor {
	color:string;
	lightText:boolean;
}
const pictureColors: Array<IPictureColor> = [
	{color:'5c005c',lightText:true},{color:'b4009e',lightText:true},{color:'e3008c',lightText:true},{color:'32145a',lightText:true},
	{color:'5c2d91',lightText:true},{color:'b4a0ff',lightText:false},{color:'002050',lightText:true},{color:'00188f',lightText:true},
	{color:'0078d7',lightText:true},{color:'00bcf2',lightText:false},{color:'004b50',lightText:true},{color:'008272',lightText:true},
	{color:'00b294',lightText:false},{color:'004b1c',lightText:true},{color:'107c10',lightText:true},{color:'bad80a',lightText:false},
	{color:'ffb900',lightText:false},{color:'fff100',lightText:false},{color:'d83b01',lightText:true},{color:'ea4300',lightText:true},
	{color:'ff8c00',lightText:false},{color:'a80000',lightText:true},{color:'e81123',lightText:true}
];

export const generateTextValue = (): string => {
	return adjectives[getRandomInteger(0,adjectives.length-1)] + ' ' + nouns[getRandomInteger(0,nouns.length-1)];
};

export const generateDomainName = (): string => {
	return generateTextValue().replace(/\s/g,'') + '.' + domainSuffixes[getRandomInteger(0,domainSuffixes.length-1)];
};

export const generatePerson = (): IPersonFieldValue => {
	let fName:string = firstNames[getRandomInteger(0,firstNames.length-1)];
	let lName:string = lastNames[getRandomInteger(0,lastNames.length-1)];
	let emailAddress:string = fName.substring(0,1) + lName.replace(/\s/g,'.') + '@' + generateDomainName();
	return {
		title: fName + ' ' + lName,
		id: getRandomInteger(1,999),
		email: emailAddress,
		sip: emailAddress,
		picture: ''
	};
};

export const generateLink = (): ILinkFieldValue => {
	return {
		URL: 'http://www.' + generateDomainName(),
		desc: generateTextValue()
	};
};

export const generatePictureLink = (width:number, height:number): ILinkFieldValue => {
	let text:string = nouns[getRandomInteger(0,nouns.length-1)];
	//let color:string = getRandomInteger(0,200).toString(16) + getRandomInteger(0,200).toString(16) + getRandomInteger(0,200).toString(16);
	let color:IPictureColor = pictureColors[getRandomInteger(0,pictureColors.length-1)];
	return {
		URL: `https://dummyimage.com/${width}x${height}/${color.color}/${color.lightText ? 'ffffff' : '000000'}&text=${text}`,
		desc: text
	};
};

export const generateLookup = (): ILookupFieldValue => {
	return {
		lookupId: getRandomInteger(1,999),
		lookupValue: generateTextValue()
	};
};

export const generateDate = (): Date => {
	let today:Date = new Date();
	//Random date between 90 days ago and 90 days in the future
	return getRandomDate(new Date(today.setTime(today.getTime() - 90 * 86400000)), new Date(today.setTime(today.getTime() + 90 * 86400000)));
};

export const generateRowValue = (type:columnTypes): any => {
	switch (type) {
		case columnTypes.person:
			return generatePerson();
		case columnTypes.boolean:
			return getRandomInteger(0,1) == 0;
		case columnTypes.number:
			return getRandomInteger(-10,100);
		case columnTypes.link:
			return generateLink();
		case columnTypes.picture:
			return generatePictureLink(150,100);
		case columnTypes.datetime:
			return generateDate();
		case columnTypes.lookup:
			return generateLookup();
		default:
			return generateTextValue();
	}
};