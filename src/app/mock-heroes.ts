//O Mock é um cara capaz de simular o comportamento de um componente, tornando possível
// você testar um outro componente isoladamente. No Angular, onde isso pode estar? Bom, 
//digamos que seu componente lista e ordena um grupo de dados (usuários por exemplo). 
//Como você testa a ordenação e a listagem sem pedir isso direto pra API? Você usa um json 
//local mesmo. Isso já poderia ser chamado de Mock, você está simulando os dados da API.
//Esse exemplo é muito básico, só pra te dar a ideia mais ou menos do que é. Você pode "mockar" várias coisas: dados, comportamentos, etc..

import { Hero } from './hero';

export const HEROES: Hero[] = [
  { id: 10, name: 'Batman' },
  { id: 12, name: 'Jorja Smith' },
  { id: 13, name: 'Marie Curie' },
  { id: 14, name: 'Shosana' },
  { id: 15, name: 'Blue Sky' },
  { id: 16, name: 'Tambourine Man' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Don McLean' },
  { id: 19, name: 'Magma' },
  { id: 20, name: 'Tornado' }
];