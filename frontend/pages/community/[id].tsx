import { ChangeEventHandler, FormEventHandler, useState } from 'react';

const Community = () => {
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setSearchKeyword('');
  };

  const handleChangeSearchKeyword: ChangeEventHandler<HTMLInputElement> = (
    e,
  ) => {
    setSearchKeyword(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={searchKeyword}
        onChange={handleChangeSearchKeyword}
      />
      <button type='submit'>뀨</button>
    </form>
  );
};

export default Community;
