import 'reflect-metadata';

import Container from 'typedi';
import Launcher from './launcher';

Container.get(Launcher).start();
