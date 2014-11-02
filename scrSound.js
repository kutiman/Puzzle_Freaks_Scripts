#pragma strict

static var audioClip = new AudioClip[4];
static public var audioSource = new AudioSource[4];
static var coinsAudioClip = new AudioClip[8];
static public var coinsAudioSource = new AudioSource[8];
static var musicAudioClip = new AudioClip[3];
static public var musicAudioSource = new AudioSource[3];

static public var sndSuccess : AudioSource;
static public var sndFail : AudioSource;
static public var sndChimes : AudioSource;

function SetSounds () {
	audioClip[0] = Resources.Load("Sounds/snd_respect");
	audioClip[1] = Resources.Load("Sounds/snd_so_easy");
	audioClip[2] = Resources.Load("Sounds/snd_yeah");
	audioClip[3] = Resources.Load("Sounds/snd_thats_right");
	
	audioSource = new AudioSource[audioClip.Length];
	for (var n = 0; n < audioSource.Length; n++) {
		audioSource[n] = gameObject.AddComponent(AudioSource);
		audioSource[n].clip = audioClip[n];
		audioSource[n].loop = false;
		audioSource[n].playOnAwake = false;
	}
	sndSuccess = gameObject.AddComponent(AudioSource);
	sndSuccess.clip = Resources.Load("Sounds/snd_clapping");
	
	sndFail = gameObject.AddComponent(AudioSource);
	sndFail.clip = Resources.Load("Sounds/snd_time_up");
	
	sndChimes = gameObject.AddComponent(AudioSource);
	sndChimes.clip = Resources.Load("Sounds/snd_chimes");
	
	coinsAudioClip[0] = Resources.Load("Sounds/snd_coin1");
	coinsAudioClip[1] = Resources.Load("Sounds/snd_coin2");
	coinsAudioClip[2] = Resources.Load("Sounds/snd_coin3");
	coinsAudioClip[3] = Resources.Load("Sounds/snd_coin4");
	coinsAudioClip[4] = Resources.Load("Sounds/snd_coin5");
	coinsAudioClip[5] = Resources.Load("Sounds/snd_coin6");
	coinsAudioClip[6] = Resources.Load("Sounds/snd_coin7");
	coinsAudioClip[7] = Resources.Load("Sounds/snd_coin8");
	
	coinsAudioSource = new AudioSource[coinsAudioClip.Length];
	for (var i = 0; i < coinsAudioSource.Length; i++) {
		coinsAudioSource[i] = gameObject.AddComponent(AudioSource);
		coinsAudioSource[i].clip = coinsAudioClip[i];
		coinsAudioSource[i].loop = false;
		coinsAudioSource[i].playOnAwake = false;
	}
	
	musicAudioClip[0] = Resources.Load("Sounds/getLucky");
	musicAudioClip[1] = Resources.Load("Sounds/lambada");
	musicAudioClip[2] = Resources.Load("Sounds/samba");
	
	musicAudioSource = new AudioSource[musicAudioClip.Length];
	for (var s = 0; s < musicAudioClip.Length; s++) {
		musicAudioSource[s] = gameObject.AddComponent(AudioSource);
		musicAudioSource[s].clip = musicAudioClip[s];
		musicAudioSource[s].loop = true;
		musicAudioSource[s].playOnAwake = false;
	}
}

static function PlayMusic () {
	var i = Random.Range(0,musicAudioSource.Length);
	musicAudioSource[i].Play();
}

static function StopMusic () {
	for (var item : AudioSource in musicAudioSource) {
		item.Stop();
	}
}

static function PlayCoinSound () {
	var i = Random.Range(0,coinsAudioSource.Length);
	coinsAudioSource[i].Play();
}

function Start () {
	SetSounds();
}

function Update () {

}