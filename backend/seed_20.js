const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'wanderway.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) process.exit(1);
    
    db.serialize(() => {
        // Clear existing to avoid duplicates
        db.run("DELETE FROM trips");
        db.run("DELETE FROM destinations");
        
        const stmt = db.prepare("INSERT INTO destinations (name, location, type, description, image, rating, price, bestTime) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        const places = [
            ["Patagonia", "Argentina", "MOUNTAIN", "The wild frontier of South America, Patagonia is a haven for hikers, nature lovers, and those seeking remote beauty.", "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200", 4.9, 2100, "December - February"],
            ["Dubai", "UAE", "CITY", "A futuristic metropolis rising from the desert, Dubai dazzles with the world's tallest building, luxury shopping malls, artificial islands, and a blend of traditional Arabian culture.", "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200", 4.8, 1800, "November - March"],
            ["Iceland", "Iceland", "COUNTRYSIDE", "The land of fire and ice, Iceland offers otherworldly landscapes including waterfalls, geysers, and black sand beaches.", "https://images.unsplash.com/photo-1520050735087-1ed65d9b0273?q=80&w=1200", 4.9, 2500, "June - August"],
            ["Kyoto", "Japan", "CITY", "Experience traditional Japan with ancient temples, beautiful gardens, and stunning autumn colors.", "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200", 4.8, 1600, "March - May, Sep - Nov"],
            ["Santorini", "Greece", "ISLAND", "Famous for its whitewashed, cubiform houses with blue accents overlooking the Aegean Sea.", "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5f1?q=80&w=1200", 4.9, 2200, "May - October"],
            ["Bali", "Indonesia", "COUNTRYSIDE", "Known for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs.", "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200", 4.7, 1200, "April - October"],
            ["Swiss Alps", "Switzerland", "MOUNTAIN", "Breathtaking snowy peaks, perfect for skiing in winter and hiking in summer.", "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=1200", 4.9, 2800, "December - March"],
            ["Rome", "Italy", "HISTORICAL", "The capital of Italy with a nearly 3,000-year-old history of globally influential art, architecture and culture.", "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1200", 4.8, 1700, "April - October"],
            ["Maldives", "Maldives", "ISLAND", "A tropical nation in the Indian Ocean known for its beaches, blue lagoons and extensive reefs.", "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1200", 4.9, 3200, "November - April"],
            ["Serengeti", "Tanzania", "COUNTRYSIDE", "Best known for its abundance of animals and the great wildebeest migration.", "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1200", 4.8, 4500, "June - October"],
            ["New York City", "USA", "CITY", "The Big Apple, featuring the Empire State Building, Times Square, and Central Park.", "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1200", 4.7, 2000, "April - June, Sep - Nov"],
            ["Machu Picchu", "Peru", "HISTORICAL", "An Incan citadel set high in the Andes Mountains, built in the 15th century.", "https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=1200", 4.9, 1500, "May - October"],
            ["Bora Bora", "French Polynesia", "ISLAND", "A small South Pacific island northwest of Tahiti in French Polynesia, surrounded by a turquoise lagoon.", "https://images.unsplash.com/photo-1596414704770-e67c30d350d5?q=80&w=1200", 4.9, 3800, "May - October"],
            ["Sahara Desert", "Morocco", "DESERT", "The largest hot desert in the world, offering incredible dunes and starry night skies.", "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?q=80&w=1200", 4.6, 1100, "October - April"],
            ["Banff", "Canada", "MOUNTAIN", "A resort town and one of Canada's most popular tourist destinations, known for its mountainous surroundings.", "https://images.unsplash.com/photo-1561134643-66c88e9ca85b?q=80&w=1200", 4.8, 2200, "June - August"],
            ["Grand Canyon", "USA", "DESERT", "A mile-deep gorge in northern Arizona boasting immense, layered bands of red rock.", "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?q=80&w=1200", 4.8, 1400, "March - May, Sep - Nov"],
            ["Venice", "Italy", "CITY", "Built on more than 100 small islands in a lagoon in the Adriatic Sea without roads, just canals.", "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?q=80&w=1200", 4.7, 1900, "April - June, Sep - Oct"],
            ["Great Barrier Reef", "Australia", "ISLAND", "The world's largest coral reef system composed of over 2,900 individual reefs.", "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?q=80&w=1200", 4.9, 3100, "June - October"],
            ["Tokyo", "Japan", "CITY", "Japan's busy capital, mixes the ultramodern and the traditional, from neon-lit skyscrapers to historic temples.", "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1200", 4.8, 2300, "March - April, Sep - Nov"],
            ["Fiordland", "New Zealand", "MOUNTAIN", "Known for the glacier-carved fiords of Doubtful and Milford sounds, offering dramatic landscapes.", "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?q=80&w=1200", 4.9, 2700, "December - February"]
        ];
        places.forEach(p => stmt.run(...p));
        stmt.finalize(() => {
            console.log("Database reset with 20 guaranteed places and robust images.");
            process.exit(0);
        });
    });
});
