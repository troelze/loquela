'use strict';

// Sources:
// https://db-migrate.readthedocs.io/en/latest/API/SQL/
// https://db-migrate.readthedocs.io/en/latest/Getting%20Started/commands/#reset
// https://www.wlaurance.com/2018/09/node-postgres-insert-multiple-rows/
var dbm;
var type;
var seed;
var pg = require('pg')
var format = require('pg-format')

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

var values = [
  ['Art 1', 'Who is your favorite artist?', 'english', 'art', 'art, artist'],
  ['Art 2', 'What is your favorite type of art?', 'english', 'art', 'art'],
  ['Art 3', 'Talk about your favorite art project that you\'ve completed', 'english', 'art', 'art'],
  ['Weather 1', 'Describe the weather today.', 'english', 'weather', 'weather'],
  ['Weather 2', 'What is your favorite season?', 'english', 'weather', 'weather, season'],
  ['Weather 3', 'Do you prefer rain or sunshine?', 'english', 'weather', 'weather'],
  ['Movies 1', 'What types of movies do you like?', 'english', 'movies', 'movie, genre'],
  ['Movies 2', 'Who is your favorite movie actor or actress?', 'english', 'movies', 'movie, actor'],
  ['Movies 3', 'What is your favorite movie and why?', 'english', 'movies', 'movie'],
  ['Electronics 1', 'What was the first electronic device you owned?', 'english', 'electronics', 'electronics, device'],
  ['Electronics 2', 'Do you prefer Apple, Microsoft, or something else? Why?', 'english', 'electronics', 'electronics, company'],
  ['Electronics 3', 'Do you think technology is good or bad for society?', 'english', 'electronics', 'electronics, society, technology'],
  ['Food and Drink 1', 'What is your favorite food?', 'english', 'food_and_drink', 'food'],
  ['Food and Drink 2', 'What is your favorite drink?', 'english', 'food_and_drink', 'drink'],
  ['Food and Drink 3', 'If you had to choose one food and one drink to consume for the rest of your life, what would it be?', 'english', 'food_and_drink', 'food, drink'],
  ['Hobbies and Leisure 1', 'What do you like to do in your free time? How long have you done that thing?', 'english', 'hobbies_and_leisure', 'hobbies, leisure'],
  ['Hobbies and Leisure 2', 'What is the hobby you spend the most time on? Why do you like it?', 'english', 'hobbies_and_leisure', 'hobbies, leisure'],
  ['Hobbies and Leisure 3', 'What new hobbies would you choose if you had time for more hobbies?', 'english', 'hobbies_and_leisure', 'hobbies, leisure'],
  ['Sports 1', 'What is your favorite sport to watch? Why?', 'english', 'sports', 'sports'],
  ['Sports 2', 'What is your favorite sport to play? Why?', 'english', 'sports', 'sports'],
  ['Sports 3', 'If you could, would you be a professional athlete? Why or why not?', 'english', 'sports', 'sports, athlete'],
  ['Travel 1', 'What is your favorite place in the world? Why do you like it?', 'english', 'travel', 'travel, place'],
  ['Travel 2', 'If you could go anywhere right now, where would you go and why?', 'english', 'travel', 'travel, place'],
  ['Travel 3', 'Do you like to travel? Why or why not?', 'english', 'travel', 'travel'],
  ['Art 1', 'Who is your favorite artist?', 'spanish', 'art', 'arte, artista'],
  ['Art 2', 'What is your favorite type of art?', 'spanish', 'art', 'arte'],
  ['Art 3', 'Talk about your favorite art project that you\'ve completed', 'spanish', 'art', 'arte'],
  ['Weather 1', 'Describe the weather today.', 'spanish', 'weather', 'clima'],
  ['Weather 2', 'What is your favorite season?', 'spanish', 'weather', 'clima, temporada'],
  ['Weather 3', 'Do you prefer rain or sunshine?', 'spanish', 'weather', 'clima'],
  ['Movies 1', 'What types of movies do you like?', 'spanish', 'movies', 'género, de, película'],
  ['Movies 2', 'Who is your favorite movie actor or actress?', 'spanish', 'movies', 'actor, de, película'],
  ['Movies 3', 'What is your favorite movie and why?', 'spanish', 'movies', 'película'],
  ['Electronics 1', 'What was the first electronic device you owned?', 'spanish', 'electronics', 'electrónica, dispositivo'],
  ['Electronics 2', 'Do you prefer Apple, Microsoft, or something else? Why?', 'spanish', 'electronics', 'electrónica, empresa'],
  ['Electronics 3', 'Do you think technology is good or bad for society?', 'spanish', 'electronics', 'electrónica, sociedad, tecnología'],
  ['Food and Drink 1', 'What is your favorite food?', 'spanish', 'food_and_drink', 'comida'],
  ['Food and Drink 2', 'What is your favorite drink?', 'spanish', 'food_and_drink', 'bebida'],
  ['Food and Drink 3', 'If you had to choose one food and one drink to consume for the rest of your life, what would it be?', 'spanish', 'food_and_drink', 'comida, bebida'],
  ['Hobbies and Leisure 1', 'What do you like to do in your free time? How long have you done that thing?', 'spanish', 'hobbies_and_leisure', 'aficiones, ocio'],
  ['Hobbies and Leisure 2', 'What is the hobby you spend the most time on? Why do you like it?', 'spanish', 'hobbies_and_leisure', 'aficiones, ocio'],
  ['Hobbies and Leisure 3', 'What new hobbies would you choose if you had time for more hobbies?', 'spanish', 'hobbies_and_leisure', 'aficiones, ocio'],
  ['Sports 1', 'What is your favorite sport to watch? Why?', 'spanish', 'sports', 'deportes'],
  ['Sports 2', 'What is your favorite sport to play? Why?', 'spanish', 'sports', 'deportes'],
  ['Sports 3', 'If you could, would you be a professional athlete? Why or why not?', 'spanish', 'sports', 'deportes, atleta'],
  ['Travel 1', 'What is your favorite place in the world? Why do you like it?', 'spanish', 'travel', 'viaje, lugar'],
  ['Travel 2', 'If you could go anywhere right now, where would you go and why?', 'spanish', 'travel', 'viaje, lugar'],
  ['Travel 3', 'Do you like to travel? Why or why not?', 'spanish', 'travel', 'viaje'],
  ['Art 1', 'Who is your favorite artist?', 'french', 'art', 'art, artiste'],
  ['Art 2', 'What is your favorite type of art?', 'french', 'art', 'art'],
  ['Art 3', 'Talk about your favorite art project that you\'ve completed', 'french', 'art', 'art'],
  ['Weather 1', 'Describe the weather today.', 'french', 'weather', 'la'],
  ['Weather 2', 'What is your favorite season?', 'french', 'weather', 'météo, saison'],
  ['Weather 3', 'Do you prefer rain or sunshine?', 'french', 'weather', 'la'],
  ['Movies 1', 'What types of movies do you like?', 'french', 'movies', 'genre, de, film'],
  ['Movies 2', 'Who is your favorite movie actor or actress?', 'french', 'movies', 'acteur, de, cinéma'],
  ['Movies 3', 'What is your favorite movie and why?', 'french', 'movies', 'film'],
  ['Electronics 1', 'What was the first electronic device you owned?', 'french', 'electronics', 'électronique, dispositif'],
  ['Electronics 2', 'Do you prefer Apple, Microsoft, or something else? Why?', 'french', 'electronics', 'électronique, entreprise'],
  ['Electronics 3', 'Do you think technology is good or bad for society?', 'french', 'electronics', 'électronique, société, technologie'],
  ['Food and Drink 1', 'What is your favorite food?', 'french', 'food_and_drink', 'nourriture'],
  ['Food and Drink 2', 'What is your favorite drink?', 'french', 'food_and_drink', 'boisson'],
  ['Food and Drink 3', 'If you had to choose one food and one drink to consume for the rest of your life, what would it be?', 'french', 'food_and_drink', 'nourriture, boisson'],
  ['Hobbies and Leisure 1', 'What do you like to do in your free time? How long have you done that thing?', 'french', 'hobbies_and_leisure', 'loisirs, loisirs'],
  ['Hobbies and Leisure 2', 'What is the hobby you spend the most time on? Why do you like it?', 'french', 'hobbies_and_leisure', 'loisirs, loisirs'],
  ['Hobbies and Leisure 3', 'What new hobbies would you choose if you had time for more hobbies?', 'french', 'hobbies_and_leisure', 'loisirs, loisirs'],
  ['Sports 1', 'What is your favorite sport to watch? Why?', 'french', 'sports', 'des'],
  ['Sports 2', 'What is your favorite sport to play? Why?', 'french', 'sports', 'des'],
  ['Sports 3', 'If you could, would you be a professional athlete? Why or why not?', 'french', 'sports', 'sport, athlète'],
  ['Travel 1', 'What is your favorite place in the world? Why do you like it?', 'french', 'travel', 'voyage, lieu'],
  ['Travel 2', 'If you could go anywhere right now, where would you go and why?', 'french', 'travel', 'voyage, lieu'],
  ['Travel 3', 'Do you like to travel? Why or why not?', 'french', 'travel', 'Voyage'],
  ['Art 1', 'Who is your favorite artist?', 'russian', 'art', 'искусство, художник'],
  ['Art 2', 'What is your favorite type of art?', 'russian', 'art', 'искусство'],
  ['Art 3', 'Talk about your favorite art project that you\'ve completed', 'russian', 'art', 'искусство'],
  ['Weather 1', 'Describe the weather today.', 'russian', 'weather', 'Погода'],
  ['Weather 2', 'What is your favorite season?', 'russian', 'weather', 'погода, сезон'],
  ['Weather 3', 'Do you prefer rain or sunshine?', 'russian', 'weather', 'Погода'],
  ['Movies 1', 'What types of movies do you like?', 'russian', 'movies', 'фильм, жанр, '],
  ['Movies 2', 'Who is your favorite movie actor or actress?', 'russian', 'movies', 'кино, актер, '],
  ['Movies 3', 'What is your favorite movie and why?', 'russian', 'movies', 'фильм'],
  ['Electronics 1', 'What was the first electronic device you owned?', 'russian', 'electronics', 'электроника, устройство'],
  ['Electronics 2', 'Do you prefer Apple, Microsoft, or something else? Why?', 'russian', 'electronics', 'электроника, компания'],
  ['Electronics 3', 'Do you think technology is good or bad for society?', 'russian', 'electronics', 'электроника, общество, технологии'],
  ['Food and Drink 1', 'What is your favorite food?', 'russian', 'food_and_drink', 'питание'],
  ['Food and Drink 2', 'What is your favorite drink?', 'russian', 'food_and_drink', 'пить'],
  ['Food and Drink 3', 'If you had to choose one food and one drink to consume for the rest of your life, what would it be?', 'russian', 'food_and_drink', 'еда, напиток'],
  ['Hobbies and Leisure 1', 'What do you like to do in your free time? How long have you done that thing?', 'russian', 'hobbies_and_leisure', 'хобби, досуг'],
  ['Hobbies and Leisure 2', 'What is the hobby you spend the most time on? Why do you like it?', 'russian', 'hobbies_and_leisure', 'хобби, досуг'],
  ['Hobbies and Leisure 3', 'What new hobbies would you choose if you had time for more hobbies?', 'russian', 'hobbies_and_leisure', 'хобби, досуг'],
  ['Sports 1', 'What is your favorite sport to watch? Why?', 'russian', 'sports', 'виды'],
  ['Sports 2', 'What is your favorite sport to play? Why?', 'russian', 'sports', 'виды'],
  ['Sports 3', 'If you could, would you be a professional athlete? Why or why not?', 'russian', 'sports', 'спорт, спортсмен'],
  ['Travel 1', 'What is your favorite place in the world? Why do you like it?', 'russian', 'travel', 'путешествия, место'],
  ['Travel 2', 'If you could go anywhere right now, where would you go and why?', 'russian', 'travel', 'путешествия, место'],
  ['Travel 3', 'Do you like to travel? Why or why not?', 'russian', 'travel', 'путешествовать'],
  ['Art 1', 'Who is your favorite artist?', 'german', 'art', 'Kunst, Künstler'],
  ['Art 2', 'What is your favorite type of art?', 'german', 'art', 'Kunst'],
  ['Art 3', 'Talk about your favorite art project that you\'ve completed', 'german', 'art', 'Kunst'],
  ['Weather 1', 'Describe the weather today.', 'german', 'weather', 'Wetter'],
  ['Weather 2', 'What is your favorite season?', 'german', 'weather', 'Wetter, Jahreszeit'],
  ['Weather 3', 'Do you prefer rain or sunshine?', 'german', 'weather', 'Wetter'],
  ['Movies 1', 'What types of movies do you like?', 'german', 'movies', 'Filmgenre, , '],
  ['Movies 2', 'Who is your favorite movie actor or actress?', 'german', 'movies', 'Filmschauspieler, , '],
  ['Movies 3', 'What is your favorite movie and why?', 'german', 'movies', 'Film'],
  ['Electronics 1', 'What was the first electronic device you owned?', 'german', 'electronics', 'Elektronik, Gerät'],
  ['Electronics 2', 'Do you prefer Apple, Microsoft, or something else? Why?', 'german', 'electronics', 'Elektronik, Unternehmen'],
  ['Electronics 3', 'Do you think technology is good or bad for society?', 'german', 'electronics', 'Elektronik, Gesellschaft, Technologie'],
  ['Food and Drink 1', 'What is your favorite food?', 'german', 'food_and_drink', 'Essen'],
  ['Food and Drink 2', 'What is your favorite drink?', 'german', 'food_and_drink', 'trinken'],
  ['Food and Drink 3', 'If you had to choose one food and one drink to consume for the rest of your life, what would it be?', 'german', 'food_and_drink', 'Essen, Trinken'],
  ['Hobbies and Leisure 1', 'What do you like to do in your free time? How long have you done that thing?', 'german', 'hobbies_and_leisure', 'Hobbys, Freizeit'],
  ['Hobbies and Leisure 2', 'What is the hobby you spend the most time on? Why do you like it?', 'german', 'hobbies_and_leisure', 'Hobbys, Freizeit'],
  ['Hobbies and Leisure 3', 'What new hobbies would you choose if you had time for more hobbies?', 'german', 'hobbies_and_leisure', 'Hobbys, Freizeit'],
  ['Sports 1', 'What is your favorite sport to watch? Why?', 'german', 'sports', 'Sport'],
  ['Sports 2', 'What is your favorite sport to play? Why?', 'german', 'sports', 'Sport'],
  ['Sports 3', 'If you could, would you be a professional athlete? Why or why not?', 'german', 'sports', 'Sport, Athlet'],
  ['Travel 1', 'What is your favorite place in the world? Why do you like it?', 'german', 'travel', 'Reise, Ort'],
  ['Travel 2', 'If you could go anywhere right now, where would you go and why?', 'german', 'travel', 'Reise, Ort'],
  ['Travel 3', 'Do you like to travel? Why or why not?', 'german', 'travel', 'Reise'],
  ['Art 1', 'Who is your favorite artist?', 'italian', 'art', 'arte, artista'],
  ['Art 2', 'What is your favorite type of art?', 'italian', 'art', 'arte'],
  ['Art 3', 'Talk about your favorite art project that you\'ve completed', 'italian', 'art', 'arte'],
  ['Weather 1', 'Describe the weather today.', 'italian', 'weather', 'tempo'],
  ['Weather 2', 'What is your favorite season?', 'italian', 'weather', 'tempo, stagione'],
  ['Weather 3', 'Do you prefer rain or sunshine?', 'italian', 'weather', 'tempo'],
  ['Movies 1', 'What types of movies do you like?', 'italian', 'movies', 'film, genere, '],
  ['Movies 2', 'Who is your favorite movie actor or actress?', 'italian', 'movies', 'Film, Attore, '],
  ['Movies 3', 'What is your favorite movie and why?', 'italian', 'movies', 'film'],
  ['Electronics 1', 'What was the first electronic device you owned?', 'italian', 'electronics', 'elettronica, dispositivo'],
  ['Electronics 2', 'Do you prefer Apple, Microsoft, or something else? Why?', 'italian', 'electronics', 'Elettronica, società'],
  ['Electronics 3', 'Do you think technology is good or bad for society?', 'italian', 'electronics', 'elettronica, la società, la tecnologia'],
  ['Food and Drink 1', 'What is your favorite food?', 'italian', 'food_and_drink', 'cibo'],
  ['Food and Drink 2', 'What is your favorite drink?', 'italian', 'food_and_drink', 'bere'],
  ['Food and Drink 3', 'If you had to choose one food and one drink to consume for the rest of your life, what would it be?', 'italian', 'food_and_drink', 'cibo, bevanda'],
  ['Hobbies and Leisure 1', 'What do you like to do in your free time? How long have you done that thing?', 'italian', 'hobbies_and_leisure', 'hobby, tempo'],
  ['Hobbies and Leisure 2', 'What is the hobby you spend the most time on? Why do you like it?', 'italian', 'hobbies_and_leisure', 'hobby, tempo'],
  ['Hobbies and Leisure 3', 'What new hobbies would you choose if you had time for more hobbies?', 'italian', 'hobbies_and_leisure', 'hobby, tempo'],
  ['Sports 1', 'What is your favorite sport to watch? Why?', 'italian', 'sports', 'gli'],
  ['Sports 2', 'What is your favorite sport to play? Why?', 'italian', 'sports', 'gli'],
  ['Sports 3', 'If you could, would you be a professional athlete? Why or why not?', 'italian', 'sports', 'sport, atleta'],
  ['Travel 1', 'What is your favorite place in the world? Why do you like it?', 'italian', 'travel', 'viaggio, posto'],
  ['Travel 2', 'If you could go anywhere right now, where would you go and why?', 'italian', 'travel', 'viaggio, posto'],
  ['Travel 3', 'Do you like to travel? Why or why not?', 'italian', 'travel', 'viaggio'],
  ['Art 1', 'Who is your favorite artist?', 'chinese', 'art', '藝術，藝術家, '],
  ['Art 2', 'What is your favorite type of art?', 'chinese', 'art', '藝術'],
  ['Art 3', 'Talk about your favorite art project that you\'ve completed', 'chinese', 'art', '藝術'],
  ['Weather 1', 'Describe the weather today.', 'chinese', 'weather', '天氣'],
  ['Weather 2', 'What is your favorite season?', 'chinese', 'weather', '天氣，季節, '],
  ['Weather 3', 'Do you prefer rain or sunshine?', 'chinese', 'weather', '天氣'],
  ['Movies 1', 'What types of movies do you like?', 'chinese', 'movies', '電影，體裁, , '],
  ['Movies 2', 'Who is your favorite movie actor or actress?', 'chinese', 'movies', '電影，演員, , '],
  ['Movies 3', 'What is your favorite movie and why?', 'chinese', 'movies', '電影'],
  ['Electronics 1', 'What was the first electronic device you owned?', 'chinese', 'electronics', '電子設備, '],
  ['Electronics 2', 'Do you prefer Apple, Microsoft, or something else? Why?', 'chinese', 'electronics', '電子公司, '],
  ['Electronics 3', 'Do you think technology is good or bad for society?', 'chinese', 'electronics', '電子，社會，技術, , '],
  ['Food and Drink 1', 'What is your favorite food?', 'chinese', 'food_and_drink', '餐飲'],
  ['Food and Drink 2', 'What is your favorite drink?', 'chinese', 'food_and_drink', '喝'],
  ['Food and Drink 3', 'If you had to choose one food and one drink to consume for the rest of your life, what would it be?', 'chinese', 'food_and_drink', '食物和飲料, '],
  ['Hobbies and Leisure 1', 'What do you like to do in your free time? How long have you done that thing?', 'chinese', 'hobbies_and_leisure', '愛好，休閒, '],
  ['Hobbies and Leisure 2', 'What is the hobby you spend the most time on? Why do you like it?', 'chinese', 'hobbies_and_leisure', '愛好，休閒, '],
  ['Hobbies and Leisure 3', 'What new hobbies would you choose if you had time for more hobbies?', 'chinese', 'hobbies_and_leisure', '愛好，休閒, '],
  ['Sports 1', 'What is your favorite sport to watch? Why?', 'chinese', 'sports', '體育'],
  ['Sports 2', 'What is your favorite sport to play? Why?', 'chinese', 'sports', '體育'],
  ['Sports 3', 'If you could, would you be a professional athlete? Why or why not?', 'chinese', 'sports', '體育，運動員, '],
  ['Travel 1', 'What is your favorite place in the world? Why do you like it?', 'chinese', 'travel', '旅行，地方, '],
  ['Travel 2', 'If you could go anywhere right now, where would you go and why?', 'chinese', 'travel', '旅行，地方, '],
  ['Travel 3', 'Do you like to travel? Why or why not?', 'chinese', 'travel', '旅行'],  
  ['Art 1', 'Who is your favorite artist?', 'japanese', 'art', 'アート、アーティスト, '],
  ['Art 2', 'What is your favorite type of art?', 'japanese', 'art', 'アート'],
  ['Art 3', 'Talk about your favorite art project that you\'ve completed', 'japanese', 'art', 'アート'],
  ['Weather 1', 'Describe the weather today.', 'japanese', 'weather', '天気'],
  ['Weather 2', 'What is your favorite season?', 'japanese', 'weather', '天気、季節, '],
  ['Weather 3', 'Do you prefer rain or sunshine?', 'japanese', 'weather', '天気'],
  ['Movies 1', 'What types of movies do you like?', 'japanese', 'movies', '映画、ジャンル, , '],
  ['Movies 2', 'Who is your favorite movie actor or actress?', 'japanese', 'movies', '映画、俳優, , '],
  ['Movies 3', 'What is your favorite movie and why?', 'japanese', 'movies', '映画'],
  ['Electronics 1', 'What was the first electronic device you owned?', 'japanese', 'electronics', 'エレクトロニクス、デバイス, '],
  ['Electronics 2', 'Do you prefer Apple, Microsoft, or something else? Why?', 'japanese', 'electronics', 'エレクトロニクス、会社, '],
  ['Electronics 3', 'Do you think technology is good or bad for society?', 'japanese', 'electronics', 'エレクトロニクス、社会、技術, , '],
  ['Food and Drink 1', 'What is your favorite food?', 'japanese', 'food_and_drink', 'フード'],
  ['Food and Drink 2', 'What is your favorite drink?', 'japanese', 'food_and_drink', 'ドリンク'],
  ['Food and Drink 3', 'If you had to choose one food and one drink to consume for the rest of your life, what would it be?', 'japanese', 'food_and_drink', '食べ物飲み物, '],
  ['Hobbies and Leisure 1', 'What do you like to do in your free time? How long have you done that thing?', 'japanese', 'hobbies_and_leisure', '趣味、レジャー, '],
  ['Hobbies and Leisure 2', 'What is the hobby you spend the most time on? Why do you like it?', 'japanese', 'hobbies_and_leisure', '趣味、レジャー, '],
  ['Hobbies and Leisure 3', 'What new hobbies would you choose if you had time for more hobbies?', 'japanese', 'hobbies_and_leisure', '趣味、レジャー, '],
  ['Sports 1', 'What is your favorite sport to watch? Why?', 'japanese', 'sports', 'スポーツ'],
  ['Sports 2', 'What is your favorite sport to play? Why?', 'japanese', 'sports', 'スポーツ'],
  ['Sports 3', 'If you could, would you be a professional athlete? Why or why not?', 'japanese', 'sports', 'スポーツ、アスリート, '],
  ['Travel 1', 'What is your favorite place in the world? Why do you like it?', 'japanese', 'travel', '旅行、場所, '],
  ['Travel 2', 'If you could go anywhere right now, where would you go and why?', 'japanese', 'travel', '旅行、場所, '],
  ['Travel 3', 'Do you like to travel? Why or why not?', 'japanese', 'travel', '旅行'],
  ['Art 1', 'Who is your favorite artist?', 'korean', 'art', '예술, 아티스트'],
  ['Art 2', 'What is your favorite type of art?', 'korean', 'art', '미술'],
  ['Art 3', 'Talk about your favorite art project that you\'ve completed', 'korean', 'art', '미술'],
  ['Weather 1', 'Describe the weather today.', 'korean', 'weather', '날씨'],
  ['Weather 2', 'What is your favorite season?', 'korean', 'weather', '날씨, 계절'],
  ['Weather 3', 'Do you prefer rain or sunshine?', 'korean', 'weather', '날씨'],
  ['Movies 1', 'What types of movies do you like?', 'korean', 'movies', '영화, 장르, '],
  ['Movies 2', 'Who is your favorite movie actor or actress?', 'korean', 'movies', '영화, 배우, '],
  ['Movies 3', 'What is your favorite movie and why?', 'korean', 'movies', '영화'],
  ['Electronics 1', 'What was the first electronic device you owned?', 'korean', 'electronics', '전자, 제품'],
  ['Electronics 2', 'Do you prefer Apple, Microsoft, or something else? Why?', 'korean', 'electronics', '전자, 제품'],
  ['Electronics 3', 'Do you think technology is good or bad for society?', 'japanese', 'electronics', '전자 공학, 사회, 기술'],
  ['Food and Drink 1', 'What is your favorite food?', 'korean', 'food_and_drink', '식품'],
  ['Food and Drink 2', 'What is your favorite drink?', 'korean', 'food_and_drink', '음주'],
  ['Food and Drink 3', 'If you had to choose one food and one drink to consume for the rest of your life, what would it be?', 'korean', 'food_and_drink', '음식, 음료'],
  ['Hobbies and Leisure 1', 'What do you like to do in your free time? How long have you done that thing?', 'korean', 'hobbies_and_leisure', '취미, 레저'],
  ['Hobbies and Leisure 2', 'What is the hobby you spend the most time on? Why do you like it?', 'korean', 'hobbies_and_leisure', '취미, 레저'],
  ['Hobbies and Leisure 3', 'What new hobbies would you choose if you had time for more hobbies?', 'korean', 'hobbies_and_leisure', '취미, 레저'],
  ['Sports 1', 'What is your favorite sport to watch? Why?', 'korean', 'sports', '스포츠'],
  ['Sports 2', 'What is your favorite sport to play? Why?', 'korean', 'sports', '스포츠'],
  ['Sports 3', 'If you could, would you be a professional athlete? Why or why not?', 'korean', 'sports', '스포츠, 선수'],
  ['Travel 1', 'What is your favorite place in the world? Why do you like it?', 'korean', 'travel', '여행, 장소'],
  ['Travel 2', 'If you could go anywhere right now, where would you go and why?', 'korean', 'travel', '여행, 장소'],
  ['Travel 3', 'Do you like to travel? Why or why not?', 'korean', 'travel', '여행'],
  ['Art 1', 'Who is your favorite artist?', 'portuguese', 'art', 'arte, artista'],
  ['Art 2', 'What is your favorite type of art?', 'portuguese', 'art', 'arte'],
  ['Art 3', 'Talk about your favorite art project that you\'ve completed', 'portuguese', 'art', 'arte'],
  ['Weather 1', 'Describe the weather today.', 'portuguese', 'weather', 'clima'],
  ['Weather 2', 'What is your favorite season?', 'portuguese', 'weather', 'clima, estação'],
  ['Weather 3', 'Do you prefer rain or sunshine?', 'portuguese', 'weather', 'clima'],
  ['Movies 1', 'What types of movies do you like?', 'portuguese', 'movies', 'filme, gênero, '],
  ['Movies 2', 'Who is your favorite movie actor or actress?', 'portuguese', 'movies', 'Ator, de, filmes'],
  ['Movies 3', 'What is your favorite movie and why?', 'portuguese', 'movies', 'filme'],
  ['Electronics 1', 'What was the first electronic device you owned?', 'portuguese', 'electronics', 'eletrônica, dispositivo'],
  ['Electronics 2', 'Do you prefer Apple, Microsoft, or something else? Why?', 'portuguese', 'electronics', 'empresa, eletrônica'],
  ['Electronics 3', 'Do you think technology is good or bad for society?', 'portuguese', 'electronics', 'eletrônica, sociedade, tecnologia'],
  ['Food and Drink 1', 'What is your favorite food?', 'portuguese', 'food_and_drink', 'Comida'],
  ['Food and Drink 2', 'What is your favorite drink?', 'portuguese', 'food_and_drink', 'bebida'],
  ['Food and Drink 3', 'If you had to choose one food and one drink to consume for the rest of your life, what would it be?', 'portuguese', 'food_and_drink', 'comida, bebida'],
  ['Hobbies and Leisure 1', 'What do you like to do in your free time? How long have you done that thing?', 'portuguese', 'hobbies_and_leisure', 'passatempos, lazer'],
  ['Hobbies and Leisure 2', 'What is the hobby you spend the most time on? Why do you like it?', 'portuguese', 'hobbies_and_leisure', 'passatempos, lazer'],
  ['Hobbies and Leisure 3', 'What new hobbies would you choose if you had time for more hobbies?', 'portuguese', 'hobbies_and_leisure', 'passatempos, lazer'],
  ['Sports 1', 'What is your favorite sport to watch? Why?', 'portuguese', 'sports', 'Esportes'],
  ['Sports 2', 'What is your favorite sport to play? Why?', 'portuguese', 'sports', 'Esportes'],
  ['Sports 3', 'If you could, would you be a professional athlete? Why or why not?', 'portuguese', 'sports', 'esportes, atleta'],
  ['Travel 1', 'What is your favorite place in the world? Why do you like it?', 'portuguese', 'travel', 'viajar, lugar'],
  ['Travel 2', 'If you could go anywhere right now, where would you go and why?', 'portuguese', 'travel', 'viajar, lugar'],
  ['Travel 3', 'Do you like to travel? Why or why not?', 'portuguese', 'travel', 'viagem']
];
var query = format('INSERT INTO prompts (name, text, language, topic, entities) VALUES %L', values);

exports.up = async function(db, callback) {
  // We need to use pg-format and create a new connection here because otherwise there's
  // no support for inserting multiple values at once
  var client = new pg.Client({
      connectionString: 'postgres://me:password@localhost:5432/loquela'
  });
  client.connect().then(function() {
    client.query(query).then(function() {
      client.end();
    })
  });
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  'version': 1
};