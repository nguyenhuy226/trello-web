import clsx from "clsx";
import React, { createContext, useCallback, useContext, useState } from "react";
import styled from "styled-components";

const ContentWrap = styled.div`
  display: block !important;
`;

const Context = createContext({ activeContext: -1 });

export const Accordion = ({ index, date, title, children }) => {
  const { onActive, activeContent } = useContext(Context);
  const active = activeContent === index;

  const _onClick = () => {
    onActive(index);
  };
  return (
    <div className={clsx("accordion", { active })}>
      <div className="accordion__title" onClick={_onClick}>
        {date && <div className="date">Ngày {date}</div>}
        <h3>{title}</h3>
      </div>
      {active && (
        <ContentWrap
          className="content"
          dangerouslySetInnerHTML={{ __html: children }}
        />
      )}
    </div>
  );
};
Accordion.Group = ({ children }) => {
  const [activeContent, setActiveContent] = useState(-1);
  const onActive = (i) => {
    setActiveContent(i == activeContent ? -1 : i);
  };

  return (
    <Context.Provider value={{ onActive, activeContent }}>
      {React.Children.map(children, (item, i) =>
        React.cloneElement(item, { index: i })
      )}
    </Context.Provider>
  );
};

export default function Accordion2({ date, title, children, active, onClick }) {
  return (
    <div className="accordion">
      <div className="accordion__title" onClick={onClick}>
        {date && <div className="date">Ngày {date}</div>}
        <h3>{title}</h3>
      </div>
      {active && (
        <ContentWrap
          className="content"
          dangerouslySetInnerHTML={{ __html: children }}
        />
      )}
    </div>
  );
}