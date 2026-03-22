const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'wanderway.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err);
    } else {
        console.log('Database connected.');
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE,
            password TEXT,
            name TEXT
        )`);
        
        db.run(`CREATE TABLE IF NOT EXISTS destinations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            location TEXT,
            type TEXT,
            description TEXT,
            image TEXT,
            rating REAL,
            price INTEGER,
            bestTime TEXT
        )`, (err) => {
            if (!err) {
                // Seed data if empty
                db.get("SELECT COUNT(*) as count FROM destinations", (err, row) => {
                    if (row && row.count === 0) {
                        const stmt = db.prepare("INSERT INTO destinations (name, location, type, description, image, rating, price, bestTime) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
                        const places = [
                            ["Patagonia", "Argentina", "MOUNTAIN", "The wild frontier of South America, Patagonia is a haven for hikers, nature lovers, and those seeking remote beauty.", "https://images.unsplash.com/photo-1554357388-c71285bf6364?q=80&w=1200&auto=format&fit=crop", 4.9, 2100, "December - February"],
                            ["Dubai", "UAE", "CITY", "A futuristic metropolis rising from the desert, Dubai dazzles with the world's tallest building, luxury shopping malls, artificial islands, and a blend of traditional Arabian culture with ultra-modern architecture.", "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop", 4.8, 1800, "November - March"],
                            ["Iceland", "Iceland", "COUNTRYSIDE", "The land of fire and ice, Iceland offers otherworldly landscapes including waterfalls, geysers, and black sand beaches.", "https://images.unsplash.com/photo-1476610287331-b711a2dce86d?q=80&w=1200&auto=format&fit=crop", 4.9, 2500, "June - August"],
                            ["Kyoto", "Japan", "CITY", "Experience traditional Japan with ancient temples, beautiful gardens, and stunning autumn colors.", "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop", 4.8, 1600, "March - May, Sep - Nov"],
                            ["Santorini", "Greece", "ISLAND", "Famous for its whitewashed, cubiform houses with blue accents overlooking the Aegean Sea.", "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=1200&auto=format&fit=crop", 4.9, 2200, "May - October"],
                            ["Bali", "Indonesia", "COUNTRYSIDE", "Known for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs.", "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop", 4.7, 1200, "April - October"],
                            ["Swiss Alps", "Switzerland", "MOUNTAIN", "Breathtaking snowy peaks, perfect for skiing in winter and hiking in summer.", "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=1200&auto=format&fit=crop", 4.9, 2800, "December - March"],
                            ["Rome", "Italy", "HISTORICAL", "The capital of Italy with a nearly 3,000-year-old history of globally influential art, architecture and culture.", "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1200&auto=format&fit=crop", 4.8, 1700, "April - October"],
                            ["Maldives", "Maldives", "ISLAND", "A tropical nation in the Indian Ocean known for its beaches, blue lagoons and extensive reefs.", "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1200&auto=format&fit=crop", 4.9, 3200, "November - April"],
                            ["Serengeti", "Tanzania", "COUNTRYSIDE", "Best known for its abundance of animals and the great wildebeest migration.", "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1200&auto=format&fit=crop", 4.8, 4500, "June - October"],
                            ["New York City", "USA", "CITY", "The Big Apple, featuring the Empire State Building, Times Square, and Central Park.", "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1200&auto=format&fit=crop", 4.7, 2000, "April - June, Sep - Nov"],
                            ["Machu Picchu", "Peru", "HISTORICAL", "An Incan citadel set high in the Andes Mountains, built in the 15th century and later abandoned.", "https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=1200&auto=format&fit=crop", 4.9, 1500, "May - October"],
                            ["Bora Bora", "French Polynesia", "ISLAND", "A small South Pacific island northwest of Tahiti in French Polynesia, surrounded by a turquoise lagoon.", "https://images.unsplash.com/photo-1596414704770-e67c30d350d5?q=80&w=1200&auto=format&fit=crop", 4.9, 3800, "May - October"],
                            ["Sahara Desert", "Morocco", "DESERT", "The largest hot desert in the world, offering incredible dunes and starry night skies.", "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?q=80&w=1200&auto=format&fit=crop", 4.6, 1100, "October - April"],
                            ["Fiordland", "New Zealand", "MOUNTAIN", "Known for the glacier-carved fiords of Doubtful and Milford sounds, offering dramatic landscapes.", "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?q=80&w=1200", 4.9, 2700, "December - February"],
                            ["Waikiki Beach", "Hawaii, USA", "BEACH", "Famous world-renowned beach known for its white sand and perfect surfing waves.", "https://images.unsplash.com/photo-1542259009477-d625272157b7?q=80&w=1200", 4.8, 1800, "April - September"],
                            ["Copacabana", "Brazil", "BEACH", "A vibrant and energetic 4km balneario beach located in the South Zone of Rio de Janeiro.", "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=1200", 4.7, 1300, "December - March"],
                            ["Navagio Beach", "Greece", "BEACH", "Also known as Shipwreck Beach, it is an exposed cove on the coast of Zakynthos.", "https://images.unsplash.com/photo-1527327344686-218fb0658428?q=80&w=1200", 4.9, 2100, "May - October"],
                            ["Tulum Beach", "Mexico", "BEACH", "Stunning white sands and turquoise waters situated right below ancient Mayan ruins.", "https://images.unsplash.com/photo-1533052604720-bc87fb162ac0?q=80&w=1200", 4.8, 1500, "November - April"],
                            ["Whitehaven Beach", "Australia", "BEACH", "Award-winning beach on Whitsunday Island known for its crystal white silica sands.", "https://images.unsplash.com/photo-1535262412227-85541e910204?q=80&w=1200", 4.9, 2900, "September - November"],
                            ["Banff", "Canada", "MOUNTAIN", "A resort town and one of Canada's most popular tourist destinations, known for its mountainous surroundings and hot springs.", "https://images.unsplash.com/photo-1561134643-66c88e9ca85b?q=80&w=1200&auto=format&fit=crop", 4.8, 2200, "June - August"]
                        ];
                        places.forEach(p => stmt.run(...p));
                        stmt.finalize();
                    }
                });
            }
        });

        db.run(`CREATE TABLE IF NOT EXISTS trips (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER,
            destinationId INTEGER,
            travelers INTEGER,
            startDate TEXT,
            endDate TEXT,
            status TEXT,
            FOREIGN KEY(userId) REFERENCES users(id),
            FOREIGN KEY(destinationId) REFERENCES destinations(id)
        )`);
    }
});

module.exports = db;
