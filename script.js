const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');
// console.log(draggable_list)
// console.log(check)

let array;
// console.log(inputHandler('jazz'))
// console.log(myList.innerText)
// console.log(typeof myList.innerText === 'string')
// console.log(myList.innerText.split('\n'))
// const array = myList.innerText.split('\n');
// console.log(array)
let jazz = document.getElementById('jazz'); 
let guitars = document.getElementById('guitars'); 
 
function getOption() {
  output = document.querySelector('#myList').value;
  console.log(output)
  document.querySelector('.output').innerText = output.toUpperCase()

output=='jazz' ? 
array = [
  'Pianist Scott Joplin publishes his first two rags.', //1895
  'The word "jazz" first appears in print.', // 1913
  'Dizzy Gillespie and Thelonious Monk are born.', //1917
  'Coleman Hawkins plays alongside Louis Armstrong in the Fletcher Henderson\'s Orchestra.', //1924
  'John Coltrane and Miles Davis are born.', //1926
  'Pianist William "Count" Basie makes his first recordings.', //1922
  'RCA demonstrates the first 33 1/3 rmp long-playing disc.' //1931
] 
: 
output == 'guitar' ?  
array = [
  'First Pickup',
  'First Amplifier',
  'First Electric Guitar',
  'First Fully Electric Guitar',
  'Les Paul',
  'BB KING',
  'Precision Bass',
  'Fender Stratocaster',
  'Humbucker Pickups',
  'FM Broadcasts'
] 
: 
output == 'recording' ?
array = [
  'Graphaphone', 
  'Gramophone', 
  'Phonograph', 
  'Wax cylinders to discs', 
  'First electrical recordings was issued', 
  'first automatic answering machine',
  'World War II',
  'Cassette tapes released',
  'First tape cassette player made by the Norelco Company',
  'James Russell developed the Compact Disc',
  'Gordon Matthews had invented the voicemail',
  'Sony and Philips get credit for developing the Compact Disc',
  'Moving Picture Experts Group (MPEG) made for ISO/IEC',
  'Fraunhofer received a German patent for the creation of MP3s',
  'The First Ipod was released'
] : 
array = ['1','2','3']
console.log(array);
return output;
}


// Store array 

let dragStartIndex;

// Insert list items into DOM using chained methods map, sort, map, and forEach
function createList() {
  getOption()
  // document.getElementById(#draggable-list)
  draggable_list.replaceChildren();
  [...array]
    .map(a => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
    .forEach((person, index) => {
      const listItem = document.createElement('li');

      listItem.setAttribute('data-index', index);

      listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
          <p class="person-name">${person}</p>
          <i class="fas fa-grip-lines"></i>
        </div>
      `;

      array.push(listItem);
      draggable_list.appendChild(listItem);
    });

  addEventListeners();
}

function dragStart() {
  // console.log('Event: ', 'dragstart');
  dragStartIndex = +this.closest('li').getAttribute('data-index');
}

function dragEnter() {
  // console.log('Event: ', 'dragenter');
  this.classList.add('over');
}

function dragLeave() {
  // console.log('Event: ', 'dragleave');
  this.classList.remove('over');
}

function dragOver(e) {
  // console.log('Event: ', 'dragover');
  e.preventDefault();
}

function dragDrop() {
  // console.log('Event: ', 'drop');
  const dragEndIndex = +this.getAttribute('data-index');
  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove('over');
}

// Swap list items that are drag and drop
function swapItems(fromIndex, toIndex) {
  const itemOne = array[fromIndex].querySelector('.draggable');
  const itemTwo = array[toIndex].querySelector('.draggable');
  array[fromIndex].appendChild(itemTwo);
  array[toIndex].appendChild(itemOne);
}

// Check the order of list items
function checkOrder() {
  array.forEach((listItem, index) => {
    const personName = listItem.querySelector('.draggable').innerText.trim();
    if (personName !== array[index]) {
      listItem.classList.add('wrong');
    } else {
      listItem.classList.remove('wrong');
      listItem.classList.add('right');
    }
  });
}

function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable');
  const dragarray = document.querySelectorAll('.draggable-list li');
  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', dragStart);
  });

  dragarray.forEach(item => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  });
}

check.addEventListener('click', checkOrder);