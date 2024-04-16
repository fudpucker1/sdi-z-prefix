const bcrypt = require('bcrypt');

exports.seed = async function(knex) {
  await knex('items').del();
  await knex('users').del();
  await knex.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE');
  await knex.raw('TRUNCATE TABLE items RESTART IDENTITY CASCADE');

  await knex('users').insert([
    { first_name: 'James', last_name: 'Allen', username: 'james.allen', password: await bcrypt.hash('password', 10) },
    { first_name: 'Emily', last_name: 'Johnson', username: 'emily.johnson', password: await bcrypt.hash('password', 10) },
    { first_name: 'Michael', last_name: 'Smith', username: 'michael.smith', password: await bcrypt.hash('password', 10) },
    { first_name: 'Jessica', last_name: 'Brown', username: 'jessica.brown', password: await bcrypt.hash('password', 10) },
    { first_name: 'Matthew', last_name: 'Davis', username: 'matthew.davis', password: await bcrypt.hash('password', 10) },
    { first_name: 'Sarah', last_name: 'Taylor', username: 'sarah.taylor', password: await bcrypt.hash('password', 10) },
    { first_name: 'David', last_name: 'Miller', username: 'david.miller', password: await bcrypt.hash('password', 10) },
    { first_name: 'Jennifer', last_name: 'Wilson', username: 'jennifer.wilson', password: await bcrypt.hash('password', 10) },
    { first_name: 'Christopher', last_name: 'Moore', username: 'christopher.moore', password: await bcrypt.hash('password', 10) },
    { first_name: 'Amanda', last_name: 'Anderson', username: 'amanda.anderson', password: await bcrypt.hash('password', 10) },
  ]);

  await knex('items').insert([
    { user_id: 1, item_name: 'Dell S2421HS Monitor', description: 'Full HD 1920 x 1080, 24-Inch 1080p LED, 75Hz, Desktop Monitor with Adjustable Stand, 4ms Grey-to-Grey Response Time, AMD FreeSync, IPS Technology, HDMI, DisplayPort, Silver, 24.0" FHD', quantity: 10 },
    { user_id: 1, item_name: 'Logitech MX Master 3', description: 'Advanced Wireless Mouse, Ultrafast Scrolling, Ergonomic Design, 4000 DPI, Customization Buttons, USB-C, Bluetooth, Graphite', quantity: 6 },
    { user_id: 2, item_name: 'Logitech C920x HD Pro Webcam', description: '1080p Video Calling, Stereo Audio, 90-Degree Field of View, HD Light Correction, USB-A, Black', quantity: 8 },
    { user_id: 2, item_name: 'ASUS ROG Swift PG279Q Gaming Monitor', description: '27-Inch, WQHD 1440p, 165Hz, IPS, G-SYNC, Eye Care, DisplayPort, HDMI, Black', quantity: 8 },
    {user_id: 3, item_name: 'Sony WH-1000XM4 Wireless Headphones', description: 'Noise Cancelling, Over-Ear, Bluetooth, Alexa Voice Control, Black', quantity: 7},
    {user_id: 3, item_name: 'Elgato Stream Deck', description: '15 Customizable LCD Keys, Adjustable Stand, Live Content Creation Controller, Black', quantity: 9},
    {user_id: 4, item_name: 'Apple AirPods Max', description: 'Over-Ear Headphones, Active Noise Cancellation, Spatial Audio, Sky Blue', quantity: 10},
    {user_id: 4, item_name: 'Apple iPad Air (4th Generation)', description: '10.9-Inch, Wi-Fi, 64GB, Sky Blue, 2020 Model', quantity: 9},
    {user_id: 5, item_name: 'Samsung Odyssey G7 Curved Gaming Monitor', description: '32-Inch, WQHD, 240Hz, 1000R, 1ms, NVIDIA G-SYNC & FreeSync, QLED, HDR600, DisplayPort, HDMI, Black', quantity: 9},
    {user_id: 5, item_name: 'SteelSeries QcK Gaming Surface', description: 'Large Cloth, Smooth Cloth, Rubber Base, Black', quantity: 5},
    {user_id: 6, item_name: 'Corsair K95 RGB Platinum XT Mechanical Gaming Keyboard', description: 'Cherry MX Speed, RGB LED Backlit, Aluminum Frame, Black', quantity: 5},
    {user_id: 6, item_name: 'Roku Ultra 2020 Streaming Media Player', description: '4K/HD/HDR, Premium JBL Headphones, Enhanced Voice Remote, TV Controls, Black', quantity: 7},
    {user_id: 7, item_name: 'Samsung Galaxy Buds Pro', description: 'Bluetooth Earbuds, True Wireless, Noise Cancelling, Charging Case, Phantom Black, 2021 Edition', quantity: 8},
    {user_id: 7, item_name: 'LG OLED C1 Series 4K Smart TV', description: '55-Inch, OLED, Dolby Vision IQ & Atmos, webOS, ThinQ AI, HDMI 2.1, Black', quantity: 10},
    {user_id: 8, item_name: 'Canon EOS Rebel T7 DSLR Camera', description: 'EF-S 18-55mm IS II Lens Kit, 24.1 Megapixel, Full HD 1080p Video, Built-in Wi-Fi, Black', quantity: 7},
    {user_id: 8, item_name: 'Logitech G Pro X Gaming Headset', description: 'Blue Voice Mic, 7.1 Surround Sound, PRO-G 50mm Drivers, DTS Headphone:X 2.0, Memory Foam Earpads, Black', quantity: 6},
    {user_id: 9, item_name: 'Microsoft Surface Pro 7', description: '12.3-Inch Touchscreen, Intel Core i5, 8GB RAM, 128GB SSD, Platinum (Latest Model)', quantity: 6},
    {user_id: 9, item_name: 'Razer DeathAdder V2 Gaming Mouse', description: '20K DPI Optical Sensor, Fastest Gaming Mouse Switch, Chroma RGB Lighting, 8 Programmable Buttons, Rubberized Side Grips, Classic Black', quantity: 8},
    {user_id: 10, item_name: 'Bose QuietComfort 35 II Wireless Headphones', description: 'Noise Cancelling, Bluetooth, Alexa Voice Control, Silver', quantity: 7},
    {user_id: 10, item_name: 'Anker PowerCore 26800 Portable Charger', description: '26800mAh External Battery, Dual Input Port, Triple 2.4A Output Power Bank, PowerIQ 2.0', quantity: 7},
    ])
};