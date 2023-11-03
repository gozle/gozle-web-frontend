import React, { useEffect } from 'react';

export const Reparentable = (props: { children: HTMLElement }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.appendChild(props.children);
  });

  return <div ref={ref} />;
};

// class Parent extends React.Component {
//   private readonly childContainer: HTMLElement = document.createElement('div');
//   state = {
//     down: false,
//   };

//   handleClick = () => {
//     this.setState((prevState) => ({
//       down: !prevState.down,
//     }));
//   };

//   render() {
//     return (
//       <div>
//         <p>Down: {this.state.down + ''}</p>
//         <button onClick={this.handleClick}>Click</button>
//         {ReactDOM.createPortal(<Child />, this.childContainer)}
//         <h2>Root 1</h2>
//         <div key="1">
//           {!this.state.down && <Reparentable el={this.childContainer} />}
//         </div>
//         <h2>Root 2</h2>
//         <div key="2">
//           {this.state.down && <Reparentable el={this.childContainer} />}
//         </div>
//       </div>
//     );
//   }
// }
