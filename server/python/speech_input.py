# Source: https://realpython.com/python-speech-recognition/
import speech_recognition as sr

def read_in_speech(recognizer, microphone):
    # Returns a dictionary depending on result of transcription:
    #     'success':       a boolean, whether or not the API request was successful
    #     'error':         `None` or a string with the error message
    #     'transcription': `None` or a string with the transcribed text

    # Type checks
    if not isinstance(recognizer, sr.Recognizer):
        raise TypeError("`recognizer` is not instance of `Recognizer`")

    if not isinstance(microphone, sr.Microphone):
        raise TypeError("`microphone` is not instance of `Microphone`")

    # Filter out ambient noise, then start recording input
    # TODO: Should look into `listen_in_background` for continuous recording:
    # https://github.com/Uberi/speech_recognition/blob/3.8.1/reference/library-reference.rst#recognizer_instancelisten_in_backgroundsource-audiosource-callback-callablerecognizer-audiodata-any---callablebool-none
    with microphone as source:
        # recognizer.adjust_for_ambient_noise(source)
        audio = recognizer.listen(source)

    response = {
        'success': True,
        'error': None,
        'transcription': None
    }

    # See if it's possible to recognize the speech input
    # If not, record the error
    # TODO: Can pass the language code here based on user's language setting. See all codes here: https://stackoverflow.com/questions/14257598/what-are-language-codes-in-chromes-implementation-of-the-html5-speech-recogniti/14302134#14302134
    try:
        response['transcription'] = recognizer.recognize_google(audio, language='en-US')
    except sr.RequestError:
        # API was unreachable/unresponsive
        response['success'] = False
        response['error'] = 'API unavailable'
    except sr.UnknownValueError:
        # Speech couldn't be transcribed
        response['error'] = 'Unable to recognize speech'

    return response

def main():
    recognizer = sr.Recognizer()
    microphone = sr.Microphone()

    # print('Say something!')
    speech = read_in_speech(recognizer, microphone)
    
    if speech['error'] or not speech['success']:
        # print('ERROR: {}'.format(speech['error']))
        print('ERROR: {}'.format(speech['error']))

    # show the user the transcription
    else:
        print('You said: {}'.format(speech['transcription']))

main()
