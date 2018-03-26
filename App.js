import React from 'react';
import { StyleSheet, Text, TextInput, Button, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'stretch',
  },
  header: {
    flex: 1,
    padding: 20,
    backgroundColor: 'tomato',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    padding: 20,
    flex: 11,
    backgroundColor: '#fff',
  },
  countdownWrapper: {
    marginTop: 40,
    flexDirection: 'row',
  },
  timeBox: {
    flex: 1,
    flexDirection: 'column',
  },
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timerStatus: 'stopped',
      time: { m: 0, s: 0 },
      intervalTime: 0,
      timerMessage: '',
    };
  }

  startTimer() {
    this.setState({ timerStatus: 'started', timerMessage: '' });

    this.timer = setInterval(() => {
      const newTime = this.state.intervalTime > 0 ? this.state.intervalTime - 1 : 0;
      if (newTime === 0) this.timerFinished();

      this.setState({ intervalTime: newTime, time: this.secondsToTime(newTime) });
    }, 1000);
  }

  secondsToTime() {
    const { intervalTime } = this.state;
    const minutes = Math.floor((intervalTime % (60 * 60)) / 60);
    const seconds = Math.ceil((intervalTime % (60 * 60)) % 60);

    const timeObj = {
      m: minutes,
      s: seconds,
    };

    return timeObj;
  }

  timerFinished() {
    clearInterval(this.timer);
    this.setState({ timerStatus: 'stopped', timerMessage: "Time's Up!" });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{ fontSize: 20, color: 'white' }}>Mewrific</Text>
        </View>
        <View style={styles.wrapper}>
          <Text style={{ fontSize: 12 }}>Interval Time:</Text>
          <TextInput
            style={{ height: 60, fontSize: 24 }}
            keyboardType="numeric"
            placeholder="mm:ss"
            maxLength={4}
            onChangeText={intervalTime => this.setState({ intervalTime })}
          />
          <Button
            disabled={this.state.timerStatus === 'started'}
            onPress={() => this.startTimer()}
            color="tomato"
            title="START"
          />
          <View style={styles.countdownWrapper}>
            <View style={styles.timeBox}>
              <Text style={{ fontSize: 42 }}>{this.state.time.m}</Text>
              <Text style={{ fontSize: 20 }}>minutes</Text>
            </View>
            <View style={styles.timeBox}>
              <Text style={{ fontSize: 42 }}>{this.state.time.s}</Text>
              <Text style={{ fontSize: 20 }}>seconds</Text>
            </View>
          </View>
          <Text style={{ color: 'green', fontSize: 42 }}>{this.state.timerMessage}</Text>
        </View>
      </View>
    );
  }
}
