import css from './SearchBar.module.css';
import { Formik, Form, Field } from 'formik';
import { FiSearch } from 'react-icons/fi';

export const Searchbar = ({ onSubmit }) => {
  return (
    <Formik
      className={css.Searchbar}
      initialValues={{
        query: '',
      }}
      onSubmit={(values, actions) => {
        onSubmit(values);
        actions.resetForm();
      }}
    >
      <Form className={css.Searchbar}>
        <Field
          className={css.searchForm_Input}
          type="text"
          autoComplete="off"
          name="query"
          placeholder="Search images and photos"
        />
        <button className={css.searchForm_Button}>
          <FiSearch size="16px" />
        </button>
      </Form>
    </Formik>
  );
};
