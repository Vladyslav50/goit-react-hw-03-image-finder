// import css from './SearchBar.module.css';
// import { Formik, Form, Field } from 'formik';
// import { FiSearch } from 'react-icons/fi';

// export const Searchbar = ({ onSubmit }) => {
//   return (
//     <Formik
//       className={css.Searchbar}
//       const
//       initialValues={{
//         keyWord: '',
//       }}
//       onSubmit={(values, actions) => {
//         onSubmit(values);
//         actions.resetForm();
//       }}
//     >
//       <Form className={css.Searchbar}>
//         <Field
//           className={css.searchForm_Input}
//           type="text"
//           autoComplete="off"
//           name="keyWord:"
//           placeholder="Search images and photos"
//         />
//         <button className={css.searchForm_Button}>
//           <FiSearch size="16px" />
//         </button>
//       </Form>
//     </Formik>
//   );
// };

// ************************************************************************

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import css from './SearchBar.module.css';
import { FiSearch } from 'react-icons/fi';

const validationSchema = Yup.object().shape({
  curentKeyWord: Yup.string().required('This field is required'),
});

export const Searchbar = ({ onSubmit }) => {
  const initialValues = {
    curentKeyWord: '',
  };

  const handleSubmit = (values, { resetForm }) => {
    onSubmit(values.curentKeyWord);
    resetForm();
  };

  return (
    <header className={css.Searchbar}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.SearchForm}>
          <Field
            type="text"
            name="curentKeyWord"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            className={css.SearchForm_input}
          />
          <button type="submit" className={css.SearchForm_button}>
            <FiSearch size="12px" />
          </button>
          <ErrorMessage
            name="curentKeyWord"
            component="div"
            className={css.errorMessage}
          />
        </Form>
      </Formik>
    </header>
  );
};
