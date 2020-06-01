// npm modules
const express = require('express');
const chalk = require('chalk'); // for color coding different logs for easier analysis
const debug = require('debug')('app');
const morgan = require('morgan'); // for logging requests to server
const path = require('path'); // for static dir name

// create the server
const app = express();
const port = process.env.PORT || 5000;
const singleRouter = express.Router();
const blogPosts = [
  {
    title: 'War and Peace',
    genre: 'Historical Fiction',
    author: 'Lev Nikolayevich Tolstoy',
    date: '1st June 2020',
    content: 'In Russia\'s struggle with Napoleon, Tolstoy saw a tragedy that involved all mankind. Greater than a historical chronicle, War and Peace is an affirmation of life itself, `a complete picture\', as a contemporary reviewer put it, `of everything in which people find their happiness and greatness, their grief and humiliation\'. Tolstoy gave his personal approval to this translation, published here in a new single volume edition, which includes an introduction by Henry Gifford, and Tolstoy\'s important essay `Some Words about War and Peace\'.',
    read: false
  },
  {
    title: 'Les Misérables',
    genre: 'Historical Fiction',
    date: '1st June 2020',
    author: 'Victor Hugo',
    content: 'Introducing one of the most famous characters in literature, Jean Valjean—the noble peasant imprisoned for stealing a loaf of bread—Les Misérables ranks among the greatest novels of all time. In it, Victor Hugo takes readers deep into the Parisian underworld, immerses them in a battle between good and evil, and carries them to the barricades during the uprising of 1832 with a breathtaking realism that is unsurpassed in modern prose. Within his dramatic story are themes that capture the intellect and the emotions: crime and punishment, the relentless persecution of Valjean by Inspector Javert, the desperation of the prostitute Fantine, the amorality of the rogue Thénardier, and the universal desire to escape the prisons of our own minds. Les Misérables gave Victor Hugo a canvas upon which he portrayed his criticism of the French political and judicial systems, but the portrait that resulted is larger than life, epic in scope—an extravagant spectacle that dazzles the senses even as it touches the heart.',
    read: false
  },
  {
    title: 'The Time Machine',
    genre: 'Science Fiction',
    author: 'H. G. Wells',
    date: '1st June 2020',
    content: 'So begins the Time Traveller’s astonishing firsthand account of his journey 800,000 years beyond his own era—and the story that launched H.G. Wells’s successful career and earned him his reputation as the father of science fiction. With a speculative leap that still fires the imagination, Wells sends his brave explorer to face a future burdened with our greatest hopes...and our darkest fears. A pull of the Time Machine’s lever propels him to the age of a slowly dying Earth.  There he discovers two bizarre races—the ethereal Eloi and the subterranean Morlocks—who not only symbolize the duality of human nature, but offer a terrifying portrait of the men of tomorrow as well.  Published in 1895, this masterpiece of invention captivated readers on the threshold of a new century. Thanks to Wells’s expert storytelling and provocative insight, The Time Machine will continue to enthrall readers for generations to come.',
    read: false
  },
  {
    title: 'A Journey into the Center of the Earth',
    genre: 'Science Fiction',
    author: 'Jules Verne',
    date: '1st June 2020',
    content: 'Journey to the Center of the Earth is a classic 1864 science fiction novel by Jules Verne (published in the original French as Voyage au centre de la Terre). The story involves a professor who leads his nephew and hired guide down a volcano in Iceland to the "center of the Earth". They encounter many adventures, including prehistoric animals and natural hazards, eventually coming to the surface again in southern Italy.',
    read: false
  },
  {
    title: 'The Dark World',
    genre: 'Fantasy',
    author: 'Henry Kuttner',
    date: '1st June 2020',
    content: 'Paige Kelly is used to weird--in fact, she probably corners the market on weird, considering that her best friend, Dottie, has been dead since the 1950s. But when a fire demon attacks Paige in detention, she has to admit that things have gotten out of her league. Luckily, the cute new boy in school, Logan Bradley, is a practiced demon slayer-and he isn\'t fazed by Paige\'s propensity to chat with the dead. Suddenly, Paige is smack in the middle of a centuries-old battle between warlocks and demons, learning to fight with a magic sword so that she can defend herself. And if she makes one wrong move, she\'ll be pulled into the Dark World, an alternate version of our world that\'s overrun by demons-and she might never make it home.',
    read: false
  },
  {
    title: 'The Wind in the Willows',
    genre: 'Fantasy',
    author: 'Kenneth Grahame',
    date: '1st June 2020',
    content: 'One of the most celebrated works of classic literature for children. Meet little Mole, willful Ratty, Badger the perennial bachelor, and petulant Toad. Over one hundred years since their first appearance in 1908, they\'ve become emblematic archetypes of eccentricity, folly, and friendship. And their misadventures-in gypsy caravans, stolen sports cars, and their Wild Wood-continue to capture readers\' imaginations and warm their hearts long after they grow up. Begun as a series of letters from Kenneth Grahame to his son, The Wind in the Willows is a timeless tale of animal cunning and human camaraderie. This Penguin Classics edition features an appendix of the letters in which Grahame first related the exploits of Toad.',
    read: false
  },
  {
    title: 'Life On The Mississippi',
    genre: 'History',
    author: 'Mark Twain',
    date: '1st June 2020',
    content: 'A stirring account of America\'s vanished past... The book that earned Mark Twain his first recognition as a serious writer... Discover the magic of life on the Mississippi. At once a romantic history of a mighty river, an autobiographical account of Mark Twain\'s early steamboat days, and a storehouse of humorous anecdotes and sketches, Life on the Mississippi is the raw material from which Twain wrote his finest novel: Adventures of Huckleberry Finn . "The Lincoln of our literature." (William Dean Howells)',
    read: false
  },
  {
    title: 'Childhood',
    genre: 'Biography',
    author: 'Lev Nikolayevich Tolstoy',
    date: '1st June 2020',
    content: 'Introducing one of the most famous characters in literature, Jean Valjean—the noble peasant imprisoned for stealing a loaf of bread—Les Misérables ranks among the greatest novels of all time. In it, Victor Hugo takes readers deep into the Parisian underworld, immerses them in a battle between good and evil, and carries them to the barricades during the uprising of 1832 with a breathtaking realism that is unsurpassed in modern prose. Within his dramatic story are themes that capture the intellect and the emotions: crime and punishment, the relentless persecution of Valjean by Inspector Javert, the desperation of the prostitute Fantine, the amorality of the rogue Thénardier, and the universal desire to escape the prisons of our own minds. Les Misérables gave Victor Hugo a canvas upon which he portrayed his criticism of the French political and judicial systems, but the portrait that resulted is larger than life, epic in scope—an extravagant spectacle that dazzles the senses even as it touches the heart.',
    read: false
  }];


app.use(morgan('tiny')); // tiny will log minimum logs
app.use(express.static(path.join(__dirname, '/public/'))); // tell express about static directory for putting static files like css and javascript
app.set('views', './src/views'); // Set Views Directory
app.set('view engine', 'ejs');

// Route for single page view
singleRouter.route('/')
  .get((req, res) => {
    res.render('single',
      {
        title: 'Env Blog: View blog'
      });
  });
app.use('/single', singleRouter);

// Homepage route
app.get('/', (req, res) => {
  res.render('index',
    {
      title: 'Env Blog',
      blogPosts
    });
});

// tell the server what port to listen on
app.listen(port, () => {
  debug(`Listening on port: ${chalk.green(port)}`);
});
