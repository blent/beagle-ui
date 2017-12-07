import { Record, List } from 'immutable';
import map from 'lodash/map';

const MemoryStats = Record({
    total: 0,
    available: 0,
    used: 0,
    usedPercent: 0
}, 'MemoryStats');

const StorageStats = Record({
    total: 0,
    available: 0,
    used: 0,
    usedPercent: 0,
    path: '',
    fstype: ''
}, 'StorageStats');

const SystemStats = Record({
    os: '',
    kernel: '',
    platform: '',
    hostname: '',
    arch: '',
    cpu: List(),
    memory: MemoryStats(),
    storage: StorageStats()
}, 'SystemStats');

export default function create(values) {
    return new SystemStats({
        os: values.os,
        kernel: values.kernel,
        platform: values.platform,
        hostname: values.hostname,
        arch: values.arch,
        cpu: List(values.cpu),
        memory: MemoryStats(values.memory),
        storage: List(map(values.storage, StorageStats))
    });
}
