const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'wanderway.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) process.exit(1);
    
    db.serialize(() => {
        const stmt = db.prepare("INSERT INTO destinations (name, location, type, description, image, rating, price, bestTime) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        const places = [
            ["Waikiki Beach", "Hawaii, USA", "BEACH", "Famous world-renowned beach known for its white sand and perfect surfing waves.", "https://images.unsplash.com/photo-1542259009477-d625272157b7?q=80&w=1200", 4.8, 1800, "April - September"],
            ["Copacabana", "Brazil", "BEACH", "A vibrant and energetic 4km balneario beach located in the South Zone of Rio de Janeiro.", "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=1200", 4.7, 1300, "December - March"],
            ["Navagio Beach", "Greece", "BEACH", "Also known as Shipwreck Beach, it is an exposed cove on the coast of Zakynthos.", "https://images.unsplash.com/photo-1527327344686-218fb0658428?q=80&w=1200", 4.9, 2100, "May - October"],
            ["Tulum Beach", "Mexico", "BEACH", "Stunning white sands and turquoise waters situated right below ancient Mayan ruins.", "https://images.unsplash.com/photo-1533052604720-bc87fb162ac0?q=80&w=1200", 4.8, 1500, "November - April"],
            ["Whitehaven Beach", "Australia", "BEACH", "Award-winning beach on Whitsunday Island known for its crystal white silica sands.", "https://images.unsplash.com/photo-1535262412227-85541e910204?q=80&w=1200", 4.9, 2900, "September - November"]
        ];
        places.forEach(p => stmt.run(...p));
        stmt.finalize(() => {
            console.log("Successfully added 5 new Beach destinations.");
            process.exit(0);
        });
    });
});
