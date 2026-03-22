const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'wanderway.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err);
        process.exit(1);
    }
    
    db.get("SELECT COUNT(*) as count FROM destinations", (err, row) => {
        if (row && row.count < 15) {
            console.log("Adding additional beautiful destinations to database...");
            const stmt = db.prepare("INSERT INTO destinations (name, location, type, description, image, rating, price, bestTime) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            const newPlaces = [
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
                ["Banff", "Canada", "MOUNTAIN", "A resort town and one of Canada's most popular tourist destinations, known for its mountainous surroundings and hot springs.", "https://images.unsplash.com/photo-1561134643-66c88e9ca85b?q=80&w=1200&auto=format&fit=crop", 4.8, 2200, "June - August"]
            ];
            newPlaces.forEach(p => stmt.run(...p));
            stmt.finalize(() => {
                console.log("Successfully seeded additional destinations.");
                process.exit(0);
            });
        } else {
            console.log("Database already has 15 destinations.");
            process.exit(0);
        }
    });
});
