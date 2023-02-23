import s from './Header.module.css';
import classNames from 'classnames';
import { Row } from "react-bootstrap";
import ReactTypingEffect from 'react-typing-effect';

function Header() {

  return (
    <Row className={s.header}>
      <h1>
        System<span style={{ color: 'white' }}>.</span>
        <span style={{ color: '#e06c75' }}>out</span>.
        <span style={{ color: '#61afef' }}>println</span>("
      </h1>

      <div className={classNames(s.string)}>
        <ReactTypingEffect
          text={["Hello.", "World!", "toDoList"]}
          cursorRenderer={cursor => <h1>{cursor}</h1>}
          displayTextRenderer={(text, i) => {
            return (
              <h1>
                {text.split('').map((char, i) => {
                  const key = `${i}`;
                  return (
                    <span
                      key={key}>{char}</span>
                  );
                })}
              </h1>
            );
          }}
        />
      </div>

      <h1 className={classNames(s.closure)}>");
      </h1>
    </Row>
  );
}

export default Header;
