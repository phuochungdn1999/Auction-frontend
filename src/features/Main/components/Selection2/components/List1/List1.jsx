import React from 'react';
import styles from './List1.module.css';
import { useHistory } from 'react-router';
const List1 = () => {
  const history = useHistory();
  const listUser = [
    {
      stt: 1,
      image:
        'https://lh3.googleusercontent.com/nxaymgd9aJIzLXb0r3oLO0VCMFi0Zex1ubTmEYekEKwOVq1YijOULDeT1qCjk71OTsQW47zmvZ2ZuycXorgu6WA6Wosc6CiOuVnAXGk=s100',
      name: 'CryptoPunk',
      price: '123123',
      num: '123123',
    },
    {
      stt: 2,
      image:
        'https://lh3.googleusercontent.com/nxaymgd9aJIzLXb0r3oLO0VCMFi0Zex1ubTmEYekEKwOVq1YijOULDeT1qCjk71OTsQW47zmvZ2ZuycXorgu6WA6Wosc6CiOuVnAXGk=s100',
      name: 'CryptoPunk',
      price: '123123',
      num: '123123',
    },
    {
      stt: 3,
      image:
        'https://lh3.googleusercontent.com/nxaymgd9aJIzLXb0r3oLO0VCMFi0Zex1ubTmEYekEKwOVq1YijOULDeT1qCjk71OTsQW47zmvZ2ZuycXorgu6WA6Wosc6CiOuVnAXGk=s100',
      name: 'CryptoPunk',
      price: '123123',
      num: '123123',
    },
    {
      stt: 4,
      image:
        'https://lh3.googleusercontent.com/nxaymgd9aJIzLXb0r3oLO0VCMFi0Zex1ubTmEYekEKwOVq1YijOULDeT1qCjk71OTsQW47zmvZ2ZuycXorgu6WA6Wosc6CiOuVnAXGk=s100',
      name: 'CryptoPunk',
      price: '123123',
      num: '123123',
    },
    {
      stt: 5,
      image:
        'https://lh3.googleusercontent.com/nxaymgd9aJIzLXb0r3oLO0VCMFi0Zex1ubTmEYekEKwOVq1YijOULDeT1qCjk71OTsQW47zmvZ2ZuycXorgu6WA6Wosc6CiOuVnAXGk=s100',
      name: 'CryptoPunk',
      price: '123123',
      num: '123123',
    },
    {
      stt: 6,
      image:
        'https://lh3.googleusercontent.com/nxaymgd9aJIzLXb0r3oLO0VCMFi0Zex1ubTmEYekEKwOVq1YijOULDeT1qCjk71OTsQW47zmvZ2ZuycXorgu6WA6Wosc6CiOuVnAXGk=s100',
      name: 'CryptoPunk',
      price: '123123',
      num: '123123',
    },
    {
      stt: 7,
      image:
        'https://lh3.googleusercontent.com/nxaymgd9aJIzLXb0r3oLO0VCMFi0Zex1ubTmEYekEKwOVq1YijOULDeT1qCjk71OTsQW47zmvZ2ZuycXorgu6WA6Wosc6CiOuVnAXGk=s100',
      name: 'CryptoPunk',
      price: '123123',
      num: '123123',
    },
    {
      stt: 8,
      image:
        'https://lh3.googleusercontent.com/nxaymgd9aJIzLXb0r3oLO0VCMFi0Zex1ubTmEYekEKwOVq1YijOULDeT1qCjk71OTsQW47zmvZ2ZuycXorgu6WA6Wosc6CiOuVnAXGk=s100',
      name: 'CryptoPunk',
      price: '123123',
      num: '123123',
    },
    {
      stt: 9,
      image:
        'https://lh3.googleusercontent.com/nxaymgd9aJIzLXb0r3oLO0VCMFi0Zex1ubTmEYekEKwOVq1YijOULDeT1qCjk71OTsQW47zmvZ2ZuycXorgu6WA6Wosc6CiOuVnAXGk=s100',
      name: 'CryptoPunk',
      price: '123123',
      num: '123123',
    },
    {
      stt: 10,
      image:
        'https://lh3.googleusercontent.com/nxaymgd9aJIzLXb0r3oLO0VCMFi0Zex1ubTmEYekEKwOVq1YijOULDeT1qCjk71OTsQW47zmvZ2ZuycXorgu6WA6Wosc6CiOuVnAXGk=s100',
      name: 'CryptoPunk',
      price: '123123',
      num: '123123',
    },
    {
      stt: 11,
      image:
        'https://lh3.googleusercontent.com/nxaymgd9aJIzLXb0r3oLO0VCMFi0Zex1ubTmEYekEKwOVq1YijOULDeT1qCjk71OTsQW47zmvZ2ZuycXorgu6WA6Wosc6CiOuVnAXGk=s100',
      name: 'CryptoPunk',
      price: '123123',
      num: '123123',
    },
    {
      stt: 12,
      image:
        'https://lh3.googleusercontent.com/nxaymgd9aJIzLXb0r3oLO0VCMFi0Zex1ubTmEYekEKwOVq1YijOULDeT1qCjk71OTsQW47zmvZ2ZuycXorgu6WA6Wosc6CiOuVnAXGk=s100',
      name: 'CryptoPunk',
      price: '123123',
      num: '123123',
    },
  ];
  return (
    <div className={styles.List}>
      {listUser.map((item) => (
        <div
          className={styles.item}
          onClick={() => {
            history.push('/userCollection');
          }}
        >
          <div className={styles.info}>
            <div className={styles.num}>{item.stt}</div>
            <img src={item.image} alt="ava" className={styles.ava} />
            <div className={styles.containInfo}>
              <div className={styles.name}>{item.name}</div>
              <div className={styles.collection}>
                <img
                  src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
                  alt="anhr"
                />
                <div className={styles.collectionNum}>{item.price}</div>
              </div>
            </div>
          </div>
          <div className={styles.collection1}>
            <div className={styles.Num}>{item.num}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default List1;
