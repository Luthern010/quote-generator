let apiQuotes = [];

const quoteContainer = document.getElementById('quote-container')
const quoteTxt = document.getElementById('quote')
const authorTxt = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('quote-container')
const loader = document.getElementById('loader')

// Show loading
function loading(){
     loader.hidden = false;
     quoteContainer.hidden = true;
}

// Hide loading
function complete(){
     quoteContainer.hidden = false;
     loader.hidden = true;
}
// Show new quote
function newQuote(){
     loading();
     // Pick a random quote from API
     const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  
     // Check if author field is blank 
     if (!quote.author) {
          authorTxt.textContent = 'Unknown';
     } else {
          authorTxt.textContent = quote.author;
     }

     // Chck Quote length
     if(quote.length> 120){
          quoteTxt.classList.add('long-quote')
     }else {
          quoteTxt.classList.remove('long-quote')
     }
     // Set Quote, Hide Loader

     quoteTxt.textContent = quote.text;
     complete()
}
// Get Quotes from API
async function getQuotes(){
     const apiUrl = 'https://type.fit/api/quotes';
     try {
          const response = await fetch(apiUrl);
          apiQuotes = await response.json();
          newQuote();
     } catch (error) {
          // catch error here
     }
}

// Tweet Quote
function tweetQuote(){
     const twitterUrl = `https:twitter.com/intent/tweet?text=${quoteTxt.textContent} - ${authorTxt.textContent}`;
     window.open(twitterUrl, '_blank')
}

// Event Listener

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On load
getQuotes();
// loading()