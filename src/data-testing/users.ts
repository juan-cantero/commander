import bcrypt from 'bcrypt';

export const usersData = [
  {
    name: 'user1',
    email: 'user1@email.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'user2',
    email: 'user2@email.com',
    password: bcrypt.hashSync('123456', 10),
  },
  // {
  //   name: 'user3',
  //   email: 'user3@email.com',
  //   password: bcrypt.hashSync('123456', 10),
  // },
  // {
  //   name: 'user4',
  //   email: 'user4@email.com',
  //   password: bcrypt.hashSync('123456', 10),
  // },
  // {
  //   name: 'user5',
  //   email: 'user5@email.com',
  //   password: bcrypt.hashSync('123456', 10),
  // },
  // {
  //   name: 'user6',
  //   email: 'user6@email.com',
  //   password: bcrypt.hashSync('123456', 10),
  // },
  // {
  //   name: 'user7',
  //   email: 'user7@email.com',
  //   password: bcrypt.hashSync('123456', 10),
  // },
  // {
  //   name: 'user8',
  //   email: 'user8@email.com',
  //   password: bcrypt.hashSync('123456', 10),
  // },
  // {
  //   name: 'user9',
  //   email: 'user9@email.com',
  //   password: bcrypt.hashSync('123456', 10),
  // },
  // {
  //   name: 'user10',
  //   email: 'user10@email.com',
  //   password: bcrypt.hashSync('123456', 10),
  // },
];
