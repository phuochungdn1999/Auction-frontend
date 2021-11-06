import React from 'react';
import { useState } from 'react';
import styles from './Register.module.css';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Grow from '@material-ui/core/Grow';
import Header from '../../components/Header/Header';
import Textarea from './components/TextArea/TextArea';
import From from './components/From/From';
import To from './components/To/To';
import Category from './components/Category/Category';
import Importimg from './components/ImportImg/ImportImg';
const Create = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const handleChangeName = (event) => setName(event.target.value);
  const handleChangePrice = (event) => setPrice(event.target.value);

  return (
    <div className={styles.body1}>
      <Header />
      <div className={styles.body}>
        <Grow in timeout={1500}>
          <div className={styles.col7}>
            <div className={styles.signInForm}>
              <div className={styles.titles}>
                <div className={styles.titleForm}>Create</div>
              </div>
              <ValidatorForm className={styles.FormControl}>
                <div className={styles.name}>
                  Image, Video, Audio or 3D Model{' '}
                  <span className={styles.required}>*</span>
                </div>
                <Importimg />
                <div className={styles.name}>
                  Name <span className={styles.required}>*</span>
                </div>
                <TextValidator
                  fullWidth
                  type="Text"
                  label="Item Name"
                  name="name"
                  variant="filled"
                  autoComplete="off"
                  value={name}
                  onChange={handleChangeName}
                  size="small"
                  validators={['required']}
                  errorMessages={[
                    'Item Name is required',
                    'Không được để trống',
                  ]}
                  className={styles.textField}
                />
                <div className={styles.name}>
                  Description
                  <span className={styles.required}>*</span>
                </div>
                <Textarea />
                <div className={styles.wapper}>
                  <div className={styles.from}>
                    <From />
                  </div>
                  <div className={styles.from}>
                    <To />
                  </div>
                </div>
                <div className={styles.name}>
                  Price <span className={styles.required}>*</span>
                </div>
                <TextValidator
                  fullWidth
                  type="Text"
                  label="Price"
                  name="price"
                  variant="filled"
                  autoComplete="off"
                  value={price}
                  onChange={handleChangePrice}
                  size="small"
                  validators={['required']}
                  errorMessages={['Price is required', 'Không được để trống']}
                  className={styles.textField}
                />
                <div className={styles.name}>Category</div>
                <Category />
                <div className={styles.btn}>
                  <button className={styles.button}>Create</button>
                </div>
              </ValidatorForm>
            </div>
          </div>
        </Grow>
      </div>
    </div>
  );
};

export default Create;
