import { Substitute, Arg } from '@fluffy-spoon/substitute';
import { of } from 'rxjs';

import { ClipsService } from '../../ui/clips.service';

import { JsonStoreService, FfmpegService } from '../../utility';

import { FfprobeResult } from '../../../models/utility';
import { ClipsJsonStore } from '../../../models/utility/json-store/clips';
import { Clip } from '../../../models/clip';

fdescribe('ClipsService', () => {
    let clipsService: ClipsService;

    const testData = {
        ffprobeResult: {
            filename: 'test_file',
            bit_rate: '1',
            duration: '10',
            format_long_name: 'video/mp4',
            format_name: 'mp4',
            nb_streams: 1,
            size: '10000',
            start_time: '0',
            durationMs: 10,
            sizeMb: 10,
        } as FfprobeResult,

        nativeFile: {
            name: 'test_file',
            lastModified: 0,
            path: 'path/to/test_file',
            size: 10,
            type: 'video/mp4',
        } as File,

        clip: {
            uniqueId: 'foo'
        } as Clip,

        clipsStore: {
            fileName: '',
            contents: { clips: [] },
        } as ClipsJsonStore,
    };

    const mockStorageService = Substitute.for<JsonStoreService>();
    const mockFfmpegService = Substitute.for<FfmpegService>();

    // mock service overrides
    mockStorageService.load(testData.clipsStore).returns(of(testData.clipsStore));

    mockFfmpegService.getMetadata(Arg.any()).returns(of(testData.ffprobeResult));

    beforeEach(() => {
        clipsService = new ClipsService(mockStorageService, mockFfmpegService);
    });

    it('should notify on create', () => {
        // arrange
        const observer = { next: () => { } };
        const observerSpy = spyOn(observer, 'next');

        // act
        clipsService.clips$.subscribe(observer);
        clipsService.create(testData.nativeFile);

        // assert
        expect(observerSpy).toHaveBeenCalled();
    });

    it('should replay on subscribe', () => {
        // arrange
        // act
        clipsService.create(testData.nativeFile);

        // assert
        clipsService.clips$.subscribe({
            next: (clips) => {
                expect(clips.length).toBe(1);
            }
        });
    });

    it('should notify on save', () => {
        // arrange
        const observer = { next: () => { } };
        
        // act
        clipsService.clips$.subscribe(observer);
        clipsService.save()
        
        // assert
        
    });
});
