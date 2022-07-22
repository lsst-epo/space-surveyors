type GameEventName =
  | 'started'
  | 'resize'
  | 'gameStart'
  | 'timeStart'
  | 'timeEnd'
  | 'targetSet'
  | 'cameraMoving'
  | 'cameraExposing'
  | 'cameraExposureEnd'
  | 'scoreUpdate'
  | 'spawnedObject'
  | 'spawnedOcclusion'
  | 'quit'
  | 'stopped';

type GameEvent = {
  type: GameEventName;
  payload?: any;
};

type GameInputEventName =
  | 'onClick'
  | 'onContextMenu'
  | 'onDoubleClick'
  | 'onDrag'
  | 'onDragEnd'
  | 'onDragEnter'
  | 'onDragExit'
  | 'onDragLeave'
  | 'onDragOver'
  | 'onDragStart'
  | 'onDrop'
  | 'onMouseDown'
  | 'onMouseEnter'
  | 'onMouseLeave'
  | 'onMouseMove'
  | 'onMouseOut'
  | 'onMouseOver'
  | 'onMouseUp'
  | 'onWheel'
  | 'onTouchCancel'
  | 'onTouchEnd'
  | 'onTouchMove'
  | 'onTouchStart'
  | 'onKeyDown'
  | 'onKeyPress'
  | 'onKeyUp';

type GameInputEvent = {
  name: GameInputEventName;
  payload?: any;
};

export { GameEventName, GameEvent, GameInputEventName, GameInputEvent };
