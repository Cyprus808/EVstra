export const vehicles = {
 Tesla: ['Model 3', 'Model Y', 'Model S', 'Model X'], MG: ['MG4 Electric', 'MG5 Electric', 'ZS EV'], Mercedes: ['EQA', 'EQB', 'EQE', 'EQS'], BMW: ['i3', 'i4', 'i5', 'iX', 'iX1'], Nissan: ['Leaf', 'Ariya'], Volkswagen: ['ID.3', 'ID.4', 'ID.5', 'ID.7'], Škoda: ['Enyaq', 'Elroq'], Toyota: ['bZ4X']
};
export const categories = [
 { id:'charging', name:'Charging', description:'Power up. Keep going.', count:'Cables & accessories', icon:'plug' },
 { id:'brakes', name:'Brakes & suspension', description:'Confidence in every turn.', count:'Brakes, discs & more', icon:'disc' },
 { id:'filters', name:'Filters & maintenance', description:'A little care goes a long way.', count:'Filters & essentials', icon:'filter' },
 { id:'accessories', name:'Interior & accessories', description:'Make it feel like yours.', count:'Mats, storage & comfort', icon:'mat' }
];
export const products = [
 {id:'cable', name:'Type 2 charging cable', subtitle:'7.4 kW · 5 metre · Type 2', price:149, category:'charging', icon:'plug'},
 {id:'disc', name:'Front brake disc set', subtitle:'Precision fit · Set of 2', price:189, category:'brakes', icon:'disc'},
 {id:'filter', name:'Cabin air filter', subtitle:'Activated carbon · Fresh air, every drive', price:29, category:'filters', icon:'filter'},
 {id:'mats', name:'All-weather floor mats', subtitle:'Easy clean · Complete set', price:89, category:'accessories', icon:'mat'}
];
export function filterProducts(category) { return products.filter(p => !category || p.category === category); }
export function cartTotal(cart) { return products.reduce((sum,p)=>sum+p.price*(cart[p.id]||0),0); }
